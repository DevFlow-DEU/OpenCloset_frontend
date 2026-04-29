import { useState } from "react";
import "./Input.css";
import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import axios from "axios";
import { Button } from "../Button/Button";
import { SlArrowLeft } from "react-icons/sl";
import Drawer, { type DrawerType } from "../Drawer/Drawer";

type Option = string | { value: string; label: string };

type ModalContentProps = {
    onSelect: (value: string) => void;
    onClose: () => void;
};

type DefaultProps = {
    variant: "default";
    label?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    register: UseFormRegisterReturn;
    error?: FieldError;
};

type NickProps = {
    variant: "nick";
    label?: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    register: UseFormRegisterReturn;
    error?: FieldError;
    btnLabel?: string;
};

type LocationProps = {
    variant: "location";
    label?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    modalContent: (props: ModalContentProps) => React.ReactNode;
    error?: FieldError;
};

type RadioProps = {
    variant: "radio";
    label?: string;
    options: Option[];
    register: UseFormRegisterReturn;
    error?: FieldError;
};

type SelectProps = {
    variant: "select";
    label?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    drawerType: DrawerType;
    error?: FieldError;
};

type TextareaProps = {
    variant: "textarea";
    label?: string;
    placeholder?: string;
    register: UseFormRegisterReturn;
    rows?: number;
    error?: FieldError;
};

type InputProps =
    | DefaultProps
    | NickProps
    | LocationProps
    | RadioProps
    | SelectProps
    | TextareaProps;

const getOpt = (opt: Option): { value: string; label: string } => ({
    value: typeof opt === "string" ? opt : opt.value,
    label: typeof opt === "string" ? opt : opt.label,
});

export default function Input(props: InputProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayValue, setDisplayValue] = useState("");

    // 1. default
    if (props.variant === "default") {
        const { label, placeholder, type, register, error } = props;
        return (
            <div className="inp-default">
                {label && <p className="inp-label">{label}</p>}
                <input
                    className="inp-input"
                    type={type}
                    placeholder={placeholder}
                    {...register}
                />
                <div className={`inp-error-bar${error ? " error" : ""}`} />
                {error && <p className="inp-error-msg">{error.message}</p>}
            </div>
        );
    }

    // 2. nick (닉네임 중복확인)
    if (props.variant === "nick") {
        const { label, placeholder, type = "text", register, error, btnLabel = "확인" } = props;
        const { onChange: registerOnChange, ...restRegister } = register;

        const handleNickCheck = async () => {
            await axios.post(
                `${import.meta.env.VITE_BACK_URL}/경로`,
                { nickname: displayValue }
            );
        };

        return (
            <div className="inp-nick">
                {label && <p className="inp-label">{label}</p>}
                <div className="inp-nick-row">
                    <input
                        className="inp-input"
                        type={type}
                        placeholder={placeholder}
                        {...restRegister}
                        onChange={(e) => {
                            registerOnChange(e);
                            setDisplayValue(e.target.value);
                        }}
                    />
                    <button
                        type="button"
                        className={`inp-nick-btn${displayValue.trim() ? " active" : ""}`}
                        disabled={!displayValue.trim()}
                        onClick={handleNickCheck}
                    >
                        {btnLabel}
                    </button>
                </div>
                <div className={`inp-error-bar${error ? " error" : ""}`} />
                {error && <p className="inp-error-msg">{error.message}</p>}
            </div>
        );
    }

    // 3. location (거래장소)
    if (props.variant === "location") {
        const { label, placeholder, register, modalContent, error } = props;
        const { onChange: registerOnChange, ...restRegister } = register;

        return (
            <div className="inp-location">
                {label && <p className="inp-label">{label}</p>}
                <input
                    className="inp-input"
                    placeholder={placeholder}
                    value={displayValue}
                    readOnly
                    {...restRegister}
                />
                <Button
                    variant="primary"
                    className={`inp-location-btn${error ? " error" : ""}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className="inp-location-icon">⊙</span>
                    위치 입력
                </Button>
                {isModalOpen && modalContent({
                    onSelect: (val: string) => {
                        setDisplayValue(val);
                        registerOnChange({ target: { value: val, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>);
                        setIsModalOpen(false);
                    },
                    onClose: () => setIsModalOpen(false),
                })}
                {error && <p className="inp-error-msg">{error.message}</p>}
            </div>
        );
    }

    // 4. radio (성별)
    if (props.variant === "radio") {
        const { label, options, register, error } = props;
        const { onChange: registerOnChange, ...restRegister } = register;

        return (
            <div className="inp-radio">
                {label && <p className="inp-label">{label}</p>}
                <input type="hidden" {...restRegister} />
                <div className="inp-radio-group">
                    {options.map((opt: Option) => {
                        const { value: v, label: l } = getOpt(opt);
                        return (
                            <button
                                key={v}
                                type="button"
                                className={`inp-radio-btn${displayValue === v ? " active" : ""}${error ? " error" : ""}`}
                                onClick={() => {
                                    setDisplayValue(v);
                                    registerOnChange({ target: { value: v, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>);
                                }}
                            >
                                {l}
                            </button>
                        );
                    })}
                </div>
                {error && <p className="inp-error-msg">{error.message}</p>}
            </div>
        );
    }

    // 5. select (사이즈)
    if (props.variant === "select") {
        const { label, placeholder, register, drawerType, error } = props;
        const { onChange: registerOnChange, ...restRegister } = register;

        return (
            <div className="inp-select">
                {label && <p className="inp-label">{label}</p>}
                <input type="hidden" {...restRegister} />
                <button
                    type="button"
                    className={`inp-select-btn${error ? " error" : ""}`}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className={`inp-select-value${displayValue ? " selected" : ""}`}>{displayValue || placeholder || "선택해 주세요"}</span>
                    <SlArrowLeft className="inp-select-arrow" style={{ transform: "rotate(-90deg)" }} />
                </button>
                {isModalOpen && (
                    <Drawer
                        type={drawerType}
                        selected={displayValue}
                        onSelect={(val) => {
                            setDisplayValue(val);
                            registerOnChange({ target: { value: val, name: restRegister.name } } as React.ChangeEvent<HTMLInputElement>);
                            setIsModalOpen(false);
                        }}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
                {error && <p className="inp-error-msg">{error.message}</p>}
            </div>
        );
    }

    // 6. textarea (상세설명)
    const { label, placeholder, register, rows, error } = props;
    return (
        <div className="inp-textarea">
            {label && <p className="inp-label">{label}</p>}
            <textarea
                className="inp-textarea-input"
                placeholder={placeholder}
                rows={rows}
                {...register}
            />
            <div className={`inp-error-bar${error ? " error" : ""}`} />
            {error && <p className="inp-error-msg">{error.message}</p>}
        </div>
    );
}
