import LoginDataStep from "./Steps/LoginDataStep";
import DetailsDataStep from "./Steps/DetailsDataStep";
import LogoUploadStep from "./Steps/LogoUploadStep";
import BanerUploadStep from "./Steps/BanerUploadStep";

export const steps = [
    {
        step: 0,
        label: 'Wypełnij dane potrzebne do zalogowania',
        content: LoginDataStep
    },
    {
        step: 1,
        label: 'Uzupełnij szczegółowe dane dotyczące firmy',
        content: DetailsDataStep
    },
    {
        step: 2,
        label: 'Wgraj logotyp',
        content: LogoUploadStep
    },
    {
        step: 3,
        label: 'Ustaw baner widoczny w twoim profilu',
        content: BanerUploadStep
    }
];