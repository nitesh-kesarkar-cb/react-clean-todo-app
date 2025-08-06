import React from 'react'
import { useTranslation } from 'react-i18next'
import { languageNames } from '../../i18n/types'
import type { Language } from '../../i18n/types'

const LanguageSelector = () => {
    const { i18n } = useTranslation()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = e.target.value as Language
        i18n.changeLanguage(selectedLang)
        localStorage.setItem('i18nextLng', selectedLang)
    }

    return (
        <select onChange={handleChange} value={i18n.language}>
            {Object.entries(languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                    {name}
                </option>
            ))}
        </select>
    )
}

export default LanguageSelector
