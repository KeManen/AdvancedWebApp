import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';

function MyContainer(props){
    const { t, i18n } = useTranslation();

    return <>
        <Suspense fallback={<div>Loading...</div>}>
            <p>{t("frontPageText")}</p>
        </Suspense>
    </>
}

export default MyContainer;