import { Phone, MapPinned, MailIcon, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
    return(
        <>
            <footer className="bg-[#323232] text-white">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ContactInfo />
                        <SocialMedia />
                    </div>
                </div>
            </footer>
        </>
    );
}

const ContactInfo = () => {
    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
            
            <div className="flex items-start space-x-3">
                <MapPinned className="w-4 h-4 mt-0.5 text-gray-300 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed">
                    Corona del Mar, Pooc,<br />
                    Talisay City, Cebu, Philippines
                </p>
            </div>

            <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <div className="text-sm text-gray-300">
                    <p>+63 999 973 2452</p>
                    <p>+63 918 693 6086</p>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <MailIcon className="w-4 h-4 text-gray-300 flex-shrink-0" />
                <a href="mailto:valresidences@gmail.com" className="text-sm text-gray-300 hover:text-white transition-colors">
                    valresidences@gmail.com
                </a>
            </div>
        </div>
    );
}

const SocialMedia = () => {
    const socialLinks = [
        {
            icon: Facebook,
            label: "Facebook",
            url: "https://facebook.com/val-residences"
        },
        {
            icon: Instagram,
            label: "Instagram", 
            url: "https://instagram.com/valResidencesInIG"
        },
        {
            icon: Twitter,
            label: "Twitter",
            url: "https://x.com/valResidences"
        },
        {
            icon: Youtube,
            label: "YouTube",
            url: "https://youtube.com/Val-Residences"
        }
    ];

    return(
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            
            <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                        <a 
                            key={index}
                            href={social.url} 
                            className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded hover:bg-gray-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <IconComponent className="w-4 h-4" />
                            <span>{social.label}</span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default Footer;