import { Platform } from "react-native";

export type Occurrence =
    | 'Atraso no transporte'
    | 'Problema no trajeto'
    | 'Consulta médica'
    | 'Problemas pessoais'
    | 'Ouros';

export const onlyDigits = (Value: string) =>
    Value.replace(/\D/g, '').slice(0, 11);

export function formatPhone(value: string) {
    const digits = onlyDigits(value);

    if (digits.length <= 2) return digits;
    if (digits.length <= 7){
        return`(${digits.slice(0,2)}) ${digits.slice(2)}`;
    }
    if (digits.length <= 10) {
        return`(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
    }
    return`(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
}

export function isValidBrazilianPhone(value: string) {
    return [10, 11].includes(onlyDigits(value).length);
}

export function buildMessage(
    name: string,
    occurrence: Occurrence,
    note: string
){
    const student = name.trim() || 'Estudante';
    const messages: Record<Occurrence, string> = {
        'Atraso no transporte': `Olá, sou ${student}, estudante da ETEC. ` + 'Meu transporte apresentou um imprevisto e poderei chegar atrasado.',
        'Problema no trajeto':`Olá, sou ${student}, estudante da ETEC.` + 'Tive um problema durante o trajeto e gostaria de avisar.',
        'Consulta médica':`Olá, sou ${student}, estudante da ETEC.` + 'Não irei comparecer a aula hoje, pois estou em consulta médica.',
        'Problemas pessoais':`Olá, sou ${student}, estudante da ETEC.` + 'Não irei comparecer a aula hoje, devido a problemas pessoais.',
        'Ouros': `Olá, sou ${student}, estudante da ETEC.` + 'Gostaria de comunicar uma ocorrência.'
    };

    return messages[occurrence] + 
    (note.trim() ? ` Observação : $ {note.trim()}` : '');
}

export function smsUrl(phone: string, message: string) {
    const separator = Platform.OS === 'ios' ? '&' : '?';
    return `sms:${onlyDigits(phone)}${separator}body=${encodeURIComponent(message)}`
}