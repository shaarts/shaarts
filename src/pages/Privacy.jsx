import { CONFIG } from '../config';

export default function Privacy() {
  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16 pb-section-gap">
      {/* Header Section */}
      <div className="mb-16 max-w-3xl">
        <span className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-3 block">
          Legal
        </span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-6">
          Privacy Policy
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Last updated: June 10, 2026. Your privacy is of the utmost importance to us. This Privacy Policy details how Shaarts Calligraphy handles and protects the information collected from visitors of our website.
        </p>
      </div>

      {/* Policy Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Sidebar Navigation (quick jumps) */}
        <div className="lg:col-span-4 sticky top-32 hidden lg:block border-l border-primary/10 pl-6 space-y-4">
          <p className="font-label-md text-xs tracking-wider text-primary uppercase mb-6">Sections</p>
          <a href="#information-collection" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">1. Information We Collect</a>
          <a href="#information-use" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">2. How We Use Information</a>
          <a href="#information-sharing" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">3. Information Sharing</a>
          <a href="#analytics-cookies" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">4. Cookies & Analytics</a>
          <a href="#data-security" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">5. Data Security</a>
          <a href="#your-rights" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">6. Your Legal Rights</a>
          <a href="#contact-us" className="block font-label-md text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300">7. Contact Information</a>
        </div>

        {/* Main Text Content */}
        <div className="lg:col-span-8 space-y-12 bg-surface-container-low p-8 md:p-12 border border-primary/5">
          {/* Section 1 */}
          <section id="information-collection" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">1. Information We Collect</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We collect personal information that you voluntarily provide to us when inquiring about custom calligraphy or commission projects. This information includes:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <li><strong>Contact Information:</strong> Your name and email address.</li>
              <li><strong>Project Specifications:</strong> Dimensions, medium, script styles, and detailed project descriptions you supply.</li>
              <li><strong>Interaction Information:</strong> Messages and context shared during the commission intake process.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="information-use" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">2. How We Use Your Information</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Your personal information is used exclusively to deliver bespoke artwork services, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <li>Reviewing and responding to your custom commission proposals.</li>
              <li>Communicating project updates, design revisions, and billing milestones.</li>
              <li>Analyzing site performance trends to refine user navigation and overall experience.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="information-sharing" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">3. Information Sharing</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We respect your privacy. Under no circumstances do we sell, rent, lease, or trade your personal information to third parties. We only share information with trusted third-party services necessary for operating our site, conducting business, or completing financial transactions, provided those parties agree to keep all information confidential.
            </p>
          </section>

          {/* Section 4 */}
          <section id="analytics-cookies" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">4. Cookies & Analytics</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We use standard cookies and tracking pixels through **Google Analytics** to understand how visitors interact with the site. This service compiles anonymous user traffic reports (such as pages visited, geographic region, and referral sources) to help us optimize performance. You can choose to disable cookies through your browser settings without affecting your access to the site.
            </p>
          </section>

          {/* Section 5 */}
          <section id="data-security" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">5. Data Security</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We implement comprehensive security protocols (including SSL encryption) to guard the transmission of your form details. While we take extensive precautions to safeguard data, no internet transmission or electronic storage is completely secure; therefore, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 6 */}
          <section id="your-rights" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">6. Your Legal Rights</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Depending on your location, you may have the right to request access to, correction of, or deletion of the personal information we hold about you. To request deletion of inquiry emails or contact records, please reach out directly using the address below.
            </p>
          </section>

          {/* Section 7 */}
          <section id="contact-us" className="space-y-4 scroll-mt-32">
            <h2 className="font-headline-md text-headline-md text-primary">7. Contact Information</h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              If you have questions regarding this Privacy Policy, or wish to request data updates/deletion, please contact us:
            </p>
            <div className="pt-2">
              <a 
                href={`mailto:${CONFIG.EMAIL}`}
                className="inline-block px-8 py-3 bg-primary text-white font-label-md text-label-md tracking-widest hover:bg-gold-leaf transition-colors duration-300"
              >
                EMAIL US ({CONFIG.EMAIL})
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Subtle Divider */}
      <hr className="mt-section-gap border-t border-primary/10" />
    </div>
  );
}
