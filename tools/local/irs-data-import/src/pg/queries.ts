export const callSave = async (client: any) => {
    await client.query("SELECT insert_charity_to_final()")
}

export const turncateStaging = async (client: any) => {
    await client.query(`TRUNCATE TABLE "CharityStaging"`)
}