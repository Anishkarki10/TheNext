export default function Privacy() {
  return (
    <div className="pt-16">
      <section className="bg-[#F5EDE1] py-16">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#264F24]/10 text-[#264F24] font-body text-xs font-semibold mb-4">
            ⚠ Final legal review required
          </div>
          <h1 className="font-display font-black text-5xl lg:text-6xl text-[#22231F] uppercase leading-none">
            Privacy Notice
          </h1>
          <p className="font-body text-sm text-[#676A61] mt-4">The Next Protein Nepal · Kusunti-14, Lalitpur, Nepal</p>
        </div>
      </section>

      <section className="bg-[#FCFAF6] py-16 pb-24">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl space-y-10 font-body text-[#676A61] text-sm leading-relaxed">

            {[
              {
                title: '1. Who We Are',
                content: 'The Next Protein Nepal ("we", "us", "our") is a plant-based food company based at Kusunti-14, Lalitpur, Nepal. We operate this website and collect personal information through our contact and enquiry forms. You can contact us at thenextproteinnepal@gmail.com.',
              },
              {
                title: '2. What Information We Collect',
                content: 'When you submit a contact form or wholesale enquiry, we collect the personal information you provide, which may include: your name, email address, phone number, organisation name, and the content of your message. We do not collect payment information through this website.',
              },
              {
                title: '3. How We Use Your Information',
                content: 'We use the information you provide to: respond to your enquiry; provide information about our products and partnership opportunities; improve our customer service. We will only contact you in relation to your enquiry or matters directly relevant to it.',
              },
              {
                title: '4. How We Store and Protect Your Information',
                content: 'Your information is stored securely and accessed only by authorised personnel for the purposes described above. We take reasonable technical and organisational measures to protect your personal information against accidental loss or unauthorised access.',
              },
              {
                title: '5. Sharing Your Information',
                content: 'We do not sell, rent or share your personal information with third parties for marketing purposes. We may share your information with service providers who assist us in operating our business, subject to appropriate data protection obligations.',
              },
              {
                title: '6. Your Rights',
                content: 'You have the right to request access to the personal information we hold about you, to request correction of any inaccurate information, and to request deletion of your information where we no longer have a legitimate reason to hold it. To exercise any of these rights, contact us at thenextproteinnepal@gmail.com.',
              },
              {
                title: '7. Retention',
                content: 'We retain your personal information only for as long as necessary to fulfil the purpose for which it was collected or as required by law.',
              },
              {
                title: '8. Changes to This Notice',
                content: 'We may update this Privacy Notice from time to time. Any changes will be published on this page. We recommend reviewing this notice periodically.',
              },
              {
                title: '9. Contact',
                content: 'If you have any questions about this Privacy Notice or how we handle your personal information, please contact us at thenextproteinnepal@gmail.com or +977 9714504317.',
              },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-black text-xl uppercase text-[#22231F] mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}

            <div className="bg-[#F5EDE1] border border-[#E8DDCD] rounded-xl p-5">
              <p className="font-body text-xs text-[#676A61]">
                <strong className="text-[#22231F]">Note:</strong> This is a template document. Final legal review is required before publication. The Next Protein Nepal should seek qualified legal advice to ensure this notice complies with applicable Nepalese law and any other relevant data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
