export const useFormRules = () => {
	return {
		emailRequired: (v: string) => {
			const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(v) || "Valid E-mail required";
		},
		maxMsgLength: (v: string) => (!!v && v.length <= 1000) || "Message must not exceed 1000 characters.",
		passwordMin: (v: string) => (!!v && v.length >= 8) || "At least 8 characters",
		passwordNoSpace: (v: string) => (!!v && !v.includes(' ')) || "Cannot contain blank spaces",
        phoneOptional: (v: string) => (v === undefined || v === null || v.trim() === '' || /^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(v)) || 'Must be a 10-digit phone number',
        phoneRequired: (v: string) => /^[2-9][0-9]{2}[2-9][0-9]{6}$/.test(v) || 'Must be a 10-digit phone number',
        positiveInt: (v: string) => /^[0-9]$|^[1-9]+[0-9]*$/.test(v) || 'Positive integer required',
        positiveFloat: (v: string) => /^[0-9]{1}[.]{0,1}[0-9]*$|^[1-9]+[0-9]*[.]{0,1}[0-9]*$/.test(v) || 'Positive number required',
		required: (v: string) => !!v || "Required"
	};
};