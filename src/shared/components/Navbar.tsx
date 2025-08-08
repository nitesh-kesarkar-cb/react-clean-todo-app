import { useNavigate } from '@tanstack/react-router'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from './../../shadcn/components/ui/navigation-menu'
import { cn } from './../../shadcn/lib/utils'
import { useStorage } from '../hoc/useStorageContext'

export interface NavbarProps {
    menuItems: {
        label: string
        href: string
    }[]
}

const Navbar = ({ menuItems }: NavbarProps) => {
    const navigate = useNavigate()
    const storage = useStorage()

    const handleLogout = () => {
        // Implement logout logic here, e.g., clear auth tokens, redirect to login
        console.log('Logout clicked')
        // Redirect to login page or perform logout action
        storage.removeItem('user-profile')
        navigate({ to: '/common/login', replace: true })
    }

    return (
        <nav className="w-full px-4 py-3 border-b shadow-sm bg-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-xl font-bold tracking-tight">TODO App</div>

                <NavigationMenu>
                    <NavigationMenuList>
                        {menuItems.map((item) => (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuLink
                                    href={item.href}
                                    className={cn(
                                        'px-4 py-2 text-sm font-medium transition-colors hover:text-primary'
                                    )}
                                >
                                    {item.label}
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}

                        <NavigationMenuItem key={'logout'}>
                            <NavigationMenuLink
                                onClick={handleLogout}
                                className={cn(
                                    'px-4 py-2 text-sm font-medium transition-colors hover:text-primary'
                                )}
                            >
                                Logout
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}

export default Navbar
