import { AiFillMail, AiFillPhone, AiFillLinkedin, AiFillInstagram, AiFillFacebook, AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
    return (
    <footer className='mx-auto max-w-7xl px-4 sm:px-6 md:px-6'>
         <hr className='w-full h-0.5 mx-auto mt-8 bg-neutral-200 border-0'></hr>
          <div className='mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between'>
                <div className='text-neutral-500 dark:text-neutral-100 text-lg'>
                  &#169; 2024 Smart Recruit Project Group AC4 - Swinburne University of Technology
                </div>
                <div className='flex flex-row items-center justify-center space-x-2 text-4xl text-neutral-500 dark:text-neutral-100'>
                    <a href="mailto:info@smaart.com.au" title="email">
                        <AiFillMail className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a> 
                    <a href="tel:1300762278" title="telephone">
                        <AiFillPhone className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a>
                    <a href="https://www.linkedin.com/company/smaart-recruitment/" title="linkedin">
                        <AiFillLinkedin className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a>
                    <a href="https://www.instagram.com/smaart_recruitment/" title="instagram">
                        <AiFillInstagram className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a>
                    <a href="https://www.facebook.com/smaartrecruitment" title="facebook">
                        <AiFillFacebook className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a>
                    <a href="http://www.youtube.com/@smaarttv8899" title="youtube">
                        <AiFillYoutube className="hover:text-smartorange hover:-translate-y-1 transition-transform cursor-pointer"/>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;