export default function Terms() {
  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold mb-4">
            ⚠ Final legal review required
          </div>
          <h1 className="font-display font-black text-5xl lg:text-6xl text-[#22231F] uppercase leading-none">
            Terms & Conditions
          </h1>
          <p className="font-body text-sm text-[#676A61] mt-4">The Next Protein Nepal · Kusunti-14, Lalitpur, Nepal</p>
        </div>
      </section>

      <section className="bg-[#FCFAF6] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-10 font-body text-[#676A61] text-sm leading-relaxed">

            {[
              {
                title: '1. Website Use',
                content: "By accessing and using this website, you agree to these terms and conditions. This website is operated by The Next Protein Nepal. The content is provided for general information and product enquiry purposes. You may not use this website for any unlawful purpose or in any way that could damage, disable or impair the website.",
              },
              {
                title: '2. Product Information',
                content: 'All product descriptions, nutritional values and pricing shown on this website are provided in good faith and are based on information available at the time of publication. Nutritional values are laboratory-analysed by Miron Laboratory and Research Centre. The Next Protein Nepal reserves the right to update product information at any time without prior notice.',
              },
              {
                title: '3. Intellectual Property',
                content: 'All content on this website — including text, images, graphics, logos and brand elements — is the property of The Next Protein Nepal or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute or use any content without written permission.',
              },
              {
                title: '4. Enquiry Submissions',
                content: 'Submitting an enquiry form on this website does not constitute a purchase agreement, wholesale contract or legally binding order. All enquiries are subject to review and confirmation by The Next Protein Nepal. Wholesale pricing and availability are subject to change.',
              },
              {
                title: '5. Third-Party Links',
                content: 'This website may contain links to third-party websites. These links are provided for convenience only. The Next Protein Nepal does not endorse and is not responsible for the content or practices of any linked sites.',
              },
              {
                title: '6. Limitation of Liability',
                content: 'To the maximum extent permitted by law, The Next Protein Nepal shall not be liable for any indirect, incidental or consequential damages arising from your use of this website or its content. We make no warranty that this website will be uninterrupted, error-free or free of viruses.',
              },
              {
                title: '7. Changes to Terms',
                content: 'We reserve the right to update these terms at any time. Changes will be published on this page with an updated effective date. Continued use of this website following any changes constitutes acceptance of the revised terms.',
              },
              {
                title: '8. Governing Law',
                content: 'These terms are governed by the laws of Nepal. Any disputes arising from the use of this website shall be subject to the jurisdiction of the courts of Nepal.',
              },
              {
                title: '9. Contact',
                content: 'For questions about these terms, contact us at thenextproteinnepal@gmail.com or +977 9714504317.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}

            <div className="bg-[#F5EDE1] border border-[#E8DDCD] rounded-xl p-5 mt-8">
              <p className="font-body text-xs text-[#676A61]">
                <strong className="text-[#22231F]">Note:</strong> This is a template document. Final legal review is required before publication. The Next Protein Nepal should seek qualified legal advice to ensure these terms comply with applicable Nepalese law and any other relevant regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
