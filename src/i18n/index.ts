import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translationConfig } from './types'

i18n.use(initReactI18next).init(translationConfig)

export default i18n
