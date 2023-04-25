import { BsLinkedin, BsGithub, BsInstagram } from 'react-icons/bs';

import data from '@/_data/home/en.json';
import { IconsProps } from '../@types/footer';

export default function Footer() {
    const { copy, links } = data.footer;

    const icons: IconsProps = {
        Linkedin: <BsLinkedin size={20} />,
        Github: <BsGithub size={20} />,
        Instagram: <BsInstagram size={20} />,
    };

    return (
        <footer className="flex flex-col items-center justify-center gap-6 p-6 mx-auto 2xl:justify-between md:gap-14 max-w-7xl md:flex-row">
            <p className="text-neutral-variant-200">
                &copy; {copy.label}{' '}
                <a
                    className="font-medium hover:underline text-neutral-variant-200/80 hover:text-primary-500"
                    href={copy.link_to}
                    target="_blank"
                >
                    {copy.link_label}
                </a>
            </p>

            <div className="flex gap-4">
                {links.map((link, index) => (
                    <a
                        href={link.href}
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-300 hover:text-primary-500"
                        aria-label={link.label}
                        title={link.label}
                    >
                        {icons[link.label]}
                    </a>
                ))}
            </div>
        </footer>
    );
}
