import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, ButtonGroup } from '@mui/material';
import About from './About';
import MyContainer from './MyContainer';
import { useTranslation } from 'react-i18next';

function Header(){
    const { t, i18n } = useTranslation();
    
    return <>
        <AppBar position="static">
            <Suspense fallback={<div>Loading...</div>}>
                <Toolbar>
                    <ButtonGroup variant='text'>
                        <Link element={< About />} to="/about">{t("about")}</Link>
                        <Link element={< MyContainer />} to="/">{t("home")}</Link>
                    </ButtonGroup>
                    <ButtonGroup variant='text'>
                        <Button id="en" onClick={() => i18n.changeLanguage('en')}>EN</Button>
                        <Button id="fi" onClick={() => i18n.changeLanguage('fi')} >FI</Button>
                    </ButtonGroup>
                </Toolbar>
            </Suspense>
        </AppBar>
    </>
}

export default Header;