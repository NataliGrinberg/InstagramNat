import { AppFooter } from "./AppFooter";
import { Suggested } from "./Suggested";
import { SwitchProfile } from "./switchProfile";
import { loadUsers,getUserLogin } from '../store/actions/user.actions';
import { useEffect } from 'react';

export function SideData() {

    useEffect(() => {
        getUserLogin()
        loadUsers()
    }, [])

   
    return (
        <section className="sideData-container">
            <div className="flex-sideData-container">
                <SwitchProfile></SwitchProfile>
                <Suggested></Suggested>
                <AppFooter></AppFooter>
            </div>
        </section>
    )
}

