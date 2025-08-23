import { useAppStore } from "@/stores/app";

const { txt } = storeToRefs(useAppStore());

export const useFormRules = () => {
	return {
		emailValid: (v: string) => {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return (v === undefined || v === null || v.trim() === '' || pattern.test(v)) || txt.value.messages.emailValid;
		},
        positiveInt: (v: string) => /^[0-9]$|^[1-9]+[0-9]*$/.test(v) || txt.value.messages.positiveInt,
        positiveFloat: (v: string) => /^[0-9]{1}[.]{0,1}[0-9]*$|^[1-9]+[0-9]*[.]{0,1}[0-9]*$/.test(v) || txt.value.messages.positiveFloat,
		required: (v: string) => !!v || txt.value.messages.required
	};
};