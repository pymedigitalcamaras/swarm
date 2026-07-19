import {useTranslations} from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('footer');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-[#1E3A5F]">{t('contact')}</h1>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold">Información de contacto</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{t('email')}</p>
              <p className="text-gray-600">info@nae-energy.com</p>
            </div>
            <div>
              <p className="font-medium">{t('whatsapp')}</p>
              <p className="text-gray-600">+86 xxx xxxx xxxx</p>
            </div>
            <div>
              <p className="font-medium">{t('address')}</p>
              <p className="text-gray-600">Factory District, Guangdong Province, China</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="mb-4 text-xl font-semibold">Envíanos un mensaje</h2>
          <form className="space-y-4">
            <input placeholder="Nombre" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            <input placeholder="Email" type="email" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            <input placeholder="Teléfono" className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            <textarea placeholder="Mensaje" rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2" />
            <button type="submit" className="w-full rounded-lg bg-[#1E3A5F] py-3 font-semibold text-white hover:bg-[#152d4a]">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}