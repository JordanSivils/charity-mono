"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createTier } from "@/lib/actions/tier/create-tier";
import { CreateTier, createTierSchema, tierSchema, TierType } from "@/lib/actions/tier/tier-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export function TierForm() {
    const [error, setError ] = useState(null)

    const router = useRouter()

    const {
        control,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting }
    } = useForm<CreateTier>({
        resolver: zodResolver(createTierSchema),
        defaultValues: {
            name: "",
            dailyLimit: 0,
            resultLimit: 0,
            nearbyRadiusMaxMiles: 0,
            nearbyResultLimit: 0
        },
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<CreateTier> = async (data) => {
        try {
            await createTier(data);
            reset()
            router.refresh()
        } catch (error: any) {
            setError(error?.message)
        }
    }

    return (
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <FieldGroup>
                        <Controller 
                        control={control}
                        name="name"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Tier Name</FieldLabel>
                                <Input 
                                {...field}
                                type="text"
                                aria-invalid={fieldState.invalid}
                                placeholder="Name"
                                autoComplete="off"
                                />
                                {fieldState.error?.message && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                        />

                       <Controller
                        control={control}
                        name="dailyLimit"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Daily Request Limit</FieldLabel>
                                <Input
                                type="number"
                                value={field.value ?? 0}
                                onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(v === "" ? NaN : Number(v));
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                aria-invalid={fieldState.invalid}
                                placeholder="Limit"
                                />
                                {fieldState.error?.message && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}/>

                        <Controller
                        control={control}
                        name="resultLimit"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Standard Result Limit</FieldLabel>
                                <Input
                                type="number"
                                value={field.value ?? 0}
                                onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(v === "" ? NaN : Number(v));
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                aria-invalid={fieldState.invalid}
                                placeholder="Limit"
                                />
                                {fieldState.error?.message && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}/>

                        <Controller
                        control={control}
                        name="nearbyResultLimit"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Nearby Results Limit</FieldLabel>
                                <Input
                                type="number"
                                value={field.value ?? 0}
                                onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(v === "" ? NaN : Number(v));
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                aria-invalid={fieldState.invalid}
                                placeholder="Limit"
                                />
                                {fieldState.error?.message && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}/>

                        <Controller
                        control={control}
                        name="nearbyRadiusMaxMiles"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Max Radius Limit</FieldLabel>
                                <Input
                                type="number"
                                value={field.value ?? 0}
                                onChange={(e) => {
                                const v = e.target.value;
                                field.onChange(v === "" ? NaN : Number(v));
                                }}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                                aria-invalid={fieldState.invalid}
                                placeholder="Limit"
                                />
                                {fieldState.error?.message && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}/>
                    </FieldGroup>
                    <div>
                        <Button disabled={!isValid || isSubmitting} >Submit</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )

}