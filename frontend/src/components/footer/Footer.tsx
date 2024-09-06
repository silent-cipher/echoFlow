import React from "react";
import classes from "@/components/footer/footer.module.css";
import ContactLogo from "@/components/contactLogo/ContactLogo";

const footer_Items = [
  {
    category: "About Us",
    subcategories: ["Our Team", "Mission Statement", "Contact Us"],
  },
  {
    category: "Resources",
    subcategories: ["FAQs", "Blog", "Support"],
  },
  {
    category: "Legal",
    subcategories: ["Privacy Policy", "Terms of Service", "Disclaimer"],
  },
  {
    category: "Products",
    subcategories: ["Agents", "Create Tweets", "Sentiments", "Trends"],
  },
  {
    category: "Connect",
    subcategories: ["Facebook", "Twitter", "LinkedIn"],
  },
];

const Footer = () => {
  return (
    <div className={classes.container} id="contact">
      <div className={classes.box}>
        <div className={classes.bottom}>
          {footer_Items.map((category) => (
            <div key={category.category} className={classes.bottom_items_box}>
              <h2>{category.category}</h2>
              <div className={classes.bottom_items}>
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory} className={classes.bottom_item}>
                    {subcategory}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className={classes.bottom_footer}>
          <div className={classes.bottom_footer_left}>
            <p>© Eth online hackathon 2024</p>
          </div>
          <div className={classes.bottom_footer_right}>
            <ContactLogo size="25" rotate={0} gapSize="1rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
