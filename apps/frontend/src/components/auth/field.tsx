import { useAuthState } from "../../atoms/AuthState";
import Password from "./password";

type PropTypes = {
    type: string,
    name: 'username' | 'email' | 'password',
    placeholder: string,
    label: string,
    disabled: boolean,
}


export default function Field({ type, placeholder, name, label, disabled }: Readonly<PropTypes>) {
    const { setState, ...data } = useAuthState()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const val = e.target.value;
        setState({ [name]: val });
    }
    return (
        <div className="flex flex-col">
            {type === "password" ? (
                <Password password={data.password} disabled={disabled} handleChange={handleChange}/>
            ) : (
                <>
                    <label className="text-[#111418] dark:text-gray-200 text-sm font-medium leading-normal pb-2">{label}</label>
                    <input disabled={disabled} className="form-input w-full rounded-lg text-[#111418] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-slate-800 focus:border-primary h-12 placeholder:text-[#617589] px-4 text-base font-normal dark:text-white" placeholder={placeholder} type={type} value={data[name]} onChange={handleChange} />
                </>
            )}
        </div>
    )
}
