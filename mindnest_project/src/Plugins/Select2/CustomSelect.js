import React from 'react'
import Select from 'react-select';
import './CustomSelect.css'


function CustomSelect({ options, placeholder, styleOverride, onChange, value, layout }) {
    const minHeight = layout === 'dashboard' ? '45px' : '60px';
    const borderRadius = layout === 'dashboard' ? '10px' : '0 15px 15px 0'
    const border = layout === 'dashboard' ? '1px solid rgba(0, 0, 0, 0.06)' : '0px'
    const selectClass = layout === 'dashboard' ? 'dashboard-select2' : 'account-select2';
    const accountPlaceholderStyle = layout === 'account' ? {
        color: '#9A9A9A', // Placeholder color for account layout
        fontFamily: '"Mazzard_Italic"', // Font style for account layout
        fontWeight: '600', // Font weight for account layout
        fontSize: '20px', // Optional font size for placeholder
    } : {};
    const defaultStyles = {
        control: (styles) => ({
            ...styles, backgroundColor: '#F7F7F7',
            minHeight: minHeight,
            borderRadius: borderRadius,
            border: border,
            cursor: 'pointer',
            '&:focus': {
                outline: 'none !important', // Remove border color on focus
                boxShadow: 'none', // Remove box shadow on focus
            }
        }),
        placeholder: (styles) => ({
            ...styles,
            color: accountPlaceholderStyle.color || '#b0b0b0',
            fontSize: accountPlaceholderStyle.fontSize || '14px',
            fontStyle: accountPlaceholderStyle.fontStyle || 'normal',
            fontWeight: accountPlaceholderStyle.fontWeight || 'normal',
            fontFamily: accountPlaceholderStyle.fontFamily || '"Mazzard_Italic", sans-serif',
        }),
        singleValue: (styles) => ({
            ...styles,
            color: '#222222',
            fontSize: '20px',
            backgroundColor: '#F7F7F7', // Background color for the selected option
            fontFamily: '"MazzardH-medium", sans-serif', // Apply font family for selected value

        }),
        option: (styles) => {

            return {
                ...styles, color: '#222222',
                backgroundColor: "#fcfaf7",
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                "&:hover": {
                    backgroundColor: "#5E63BC",
                    color: "#ffffff",
                    "&:first-of-type": { borderRadius: "12px 0px 0px 0px" },
                    "&:last-child": {
                        borderRadius: "0px 0px 12px 12px",
                        border: "unset"
                    }
                }
            }
        },
        menu: (styles) => ({
            ...styles, backgroundColor: "#fcfaf7",
            borderRadius: "12px 0 12px 12px",
            marginBottom: "0",
            boxShadow: "0 4px 4px 0 rgba(0,0,0,.25)",
            border: "1.458px solid rgba(0,0,0,.1)"
        }),
        menuList: (styles) => ({
            ...styles, paddingBottom: "0px",
            paddingTop: "0",
            "&:last-child": {
                borderRadius: "0px 0px 12px 12px",
                border: "unset"
            }
        })
    }
    const colorStyles = styleOverride || defaultStyles;
    return (
        <div className={selectClass}>
            <Select
                options={options}
                placeholder={placeholder}
                styles={colorStyles}
                onChange={onChange}
                value={value}
            />
        </div>
    )
}

export default CustomSelect