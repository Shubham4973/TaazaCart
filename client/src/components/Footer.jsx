import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        {/* Logo + Description */}
        <div>
          <img
            className="w-[136px] md:w-32"
            src={assets.logo}
            alt="dummy logo"
          />
          <p className="max-w-[410px] mt-6 leading-relaxed">
            We deliver fresh groceries and snacks right to your doorstep.
            Trusted by thousands, we’re committed to making your shopping
            experience effortless, reliable, and affordable.
          </p>
        </div>

        {/* Link Sections */}
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-gray-900 hover:underline transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()}{" "}
        <a
          href="#"
          className="hover:text-primary transition-colors duration-200"
        >
          TaazaCart
        </a>{" "}
        — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
