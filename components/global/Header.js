import LanguageSwitcher from '@/components/global/LanguageSwitcher'
import Logo from '@/components/global/Logo.js'
import useStickyState from '@/lib/useStickyState'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ headerContent }) {
    const router = useRouter()
    const { locale } = router
    const [answersData, setAnswersData] = useStickyState([], 'formData')

    return (
        <header>
            <div className="container py-6 md:py-10 flex flex-col xs:flex-row items-start justify-between relative">
                <div className="flex flex-row xs:flex-col md:flex-row mb-3 xs:mb-0 w-full justify-between xs:w-auto xs:justify-start">
                    <Logo />
                    <LanguageSwitcher />
                </div>
                {router.pathname.indexOf('about') > 0 ? (
                    <Link
                        href="/checklist"
                        locale={locale}
                        className="print:hidden btn btn-small bg-gray-300 hover:bg-gray-400 md:bg-orange-400 md:hover:bg-orange-500 text-gray-900 md:text-white"
                    >
                        {!answersData || answersData.length === 0
                            ? headerContent.button_cta
                            : headerContent.button_cta_returning_users}
                    </Link>
                ) : (
                    <Link
                        href="/about"
                        locale={locale}
                        className="print:hidden btn btn-small bg-gray-300 hover:bg-gray-400 md:bg-orange-400 md:hover:bg-orange-500 text-gray-900 md:text-white"
                    >
                        {headerContent.about_button_text}
                    </Link>
                )}
            </div>
        </header>
    )
}
