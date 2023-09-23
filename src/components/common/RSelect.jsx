import React, { useCallback, useEffect, useRef, useState } from 'react'
import RInput from './RInput'
import { RiArrowDropDownLine } from 'react-icons/ri'

const RSelect = ({ classList, inputProps, iconSize, options, optionKey, onChange }) => {

    const selectRef = useRef();
    const inputRef = useRef();

    const [isOpen, setIsOpen] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const [filteredOptions, setFilteredOption] = useState(options)

    const handleFilteredOption = useCallback((value) => {
        const filter = options?.filter((op) => String(op[optionKey]).toLowerCase().includes(String(value).toLowerCase()))
        setFilteredOption(filter)
    }, [optionKey, options])


    useEffect(() => {
        const handleDocumentClick = (e) => {
            if (
                selectRef.current && !selectRef.current.contains(e.target)
                && inputRef.current && !inputRef.current.contains(e.target)

            ) {
                setIsOpen(false);
                handleFilteredOption(searchInput)
            }
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [searchInput, handleFilteredOption]);


    return (
        <div className={`RSelect ${classList ? classList : ""}`}>
            <RInput
                Icon={<RiArrowDropDownLine size={iconSize || 18} />}
                {...inputProps}
                value={searchInput}
                onChange={(e) => {
                    handleFilteredOption(e.target.value)
                    setSearchInput(e.target.value)
                }}
                inputProps={{
                    ref: inputRef,
                    onFocus: (e) => {
                        e.preventDefault()
                        handleFilteredOption(searchInput)
                        setIsOpen(true)
                    }
                }}
                end
            />
            {
                filteredOptions && isOpen && filteredOptions?.constructor === Array &&
                <div className='RSelectOptions' ref={selectRef}>
                    {
                        filteredOptions.map((op, idx) => {
                            return (
                                <div
                                    className='SelectOption'
                                    onClick={() => {
                                        if (op.constructor === String) {
                                            setSearchInput(op)
                                        } else {
                                            if (optionKey in op) {
                                                setSearchInput(op[optionKey])
                                            }
                                        }
                                        setIsOpen(false)
                                        if (onChange) {
                                            onChange(op[optionKey])
                                        }
                                    }}
                                    key={idx}
                                >
                                    <p>{op[optionKey] || ""}</p>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default RSelect