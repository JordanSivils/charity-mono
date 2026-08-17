import stateJson from './json/states.json';
import type { Handler } from 'aws-lambda';
import { streamData } from './utils/pipeline';
import client from './pg/pg-config';

type LambdaResponse = {
    statusCode: number;
    body: string;
};

export const handler: Handler<unknown, LambdaResponse> = async () => {
    const startedAt = Date.now();

    try {
        console.log(`Starting ETL for ${stateJson.length} files`);

        for (const file of stateJson) {
            const fileStartedAt = Date.now();

            console.log(`Starting: ${file.state} -> ${file.irsUrl}`);
            await streamData(file.irsUrl);
            console.log(`Finished: ${file.state} in ${Date.now() - fileStartedAt}ms`);
        }

        console.log(`All files finished in ${Date.now() - startedAt}ms`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'IRS import completed successfully',
                filesProcessed: stateJson.length,
            }),
        };
    } catch (err) {
        console.error('ETL failed', err);

        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'IRS import failed',
            }),
        };
    } finally {
        await client.end();
        console.log('done');
    }
};
