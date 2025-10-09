import React, { useCallback, useEffect, useMemo, useState } from 'react';

export default function LexBooking() {
  const params = new URLSearchParams(window.location.search);
  const sessionTitle = params.get('course') || params.get('session') || 'Reserva';
  const category = params.get('category') || '';
  const sessionId = params.get('sessionId') || '';
  const success = params.get('success') === 'true';
  const checkoutSessionId = params.get('session_id') || '';
  const [isPaid, setIsPaid] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);

  const containerStyle = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '24px 16px',
  };

  const titleStyle = {
    fontSize: 28,
    margin: '8px 0 16px',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 16px',
    background: '#000',
    color: '#fff',
    borderRadius: 6,
    textDecoration: 'none',
    border: '1px solid #000',
  };

  // Stripe publishable key (load from meta tag; fallback to fetch)
  const [publicKey, setPublicKey] = useState(
    document.querySelector('meta[name="stripe-key"]')?.getAttribute('content') || ''
  );

  // Centralized session options with placeholder price IDs
  const sessionOptions = useMemo(() => ([
    {
      id: 'carta-natal',
      title: 'Carta Natal',
      subtitle: '90 min',
      priceEUR: 100,
      priceId: 'price_carta_natal_100',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-de-construccion',
    },
    {
      id: 'introspectivas-suelta',
      title: 'Sesiones Introspectivas (Suelta)',
      subtitle: '75 min',
      priceEUR: 70,
      priceId: 'price_introspectiva_suelta_70',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-introspectivas',
    },
    {
      id: 'introspectivas-pack3',
      title: 'Sesiones Introspectivas (Pack 3)',
      subtitle: '',
      priceEUR: 180,
      priceId: 'price_introspectiva_pack3_180',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-introspectivas',
    },
    {
      id: 'introspectivas-prueba',
      title: 'Sesiones Introspectivas (Primera sesión de prueba)',
      subtitle: '',
      priceEUR: 50,
      priceId: 'price_introspectiva_prueba_50',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-introspectivas',
    },
    {
      id: 'construccion-suelta',
      title: 'Sesiones de Construcción (Suelta)',
      subtitle: '90 min',
      priceEUR: 100,
      priceId: 'price_construccion_suelta_100',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-de-construccion',
    },
    {
      id: 'construccion-pack3',
      title: 'Sesiones de Construcción (Pack 3)',
      subtitle: '',
      priceEUR: 270,
      priceId: 'price_construccion_pack3_270',
      calendlyUrl: 'https://calendly.com/lexcorazon/sesiones-de-construccion',
    },
  ]), []);

  // Prefer matching selection to preselect by incoming session title
  const suggested = useMemo(() => {
    if (sessionId) return sessionOptions.find(o => o.id === sessionId) || null;
    const lowered = sessionTitle.toLowerCase();
    return sessionOptions.find(o => lowered.includes(o.title.split(' ')[0].toLowerCase())) || null;
  }, [sessionOptions, sessionTitle, sessionId]);

  // Load Stripe.js via script tag if not present
  useEffect(() => {
    if (window.Stripe) {
      setStripeReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3';
    script.async = true;
    script.onload = () => setStripeReady(true);
    document.body.appendChild(script);
    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  const handleCheckout = useCallback(async (selected) => {
    if (!stripeReady || !window.Stripe) {
      alert('Cargando pasarela de pago...');
      return;
    }
    try {
      const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-TOKEN': csrf },
        credentials: 'same-origin',
        body: JSON.stringify({
          priceId: selected.priceId,
          sessionId: selected.id,
          sessionTitle: selected.title,
          category,
        }),
      });
      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(errText || 'No se pudo crear la sesión de pago');
      }
      const data = await res.json();
      const effectiveKey = publicKey || data.publicKey || '';
      if (!effectiveKey) throw new Error('Stripe key missing');
      const stripe = window.Stripe(effectiveKey);
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (e) {
      alert('Error iniciando pago. ' + (e?.message || 'Intenta de nuevo.'));
    }
  }, [publicKey, stripeReady, category]);

  // Fallback: fetch publishable key from backend if not present
  useEffect(() => {
    const loadKey = async () => {
      if (publicKey) return;
      try {
        const res = await fetch('/api/stripe/public-key');
        if (!res.ok) return;
        const data = await res.json();
        if (data?.key) setPublicKey(data.key);
      } catch (_) {}
    };
    loadKey();
  }, [publicKey]);

  // Verify payment on load if returning from Stripe
  useEffect(() => {
    const verify = async () => {
      if (!success || !checkoutSessionId) return;
      try {
        const res = await fetch(`/api/stripe/verify?session_id=${encodeURIComponent(checkoutSessionId)}`);
        if (!res.ok) return;
        const data = await res.json();
        setIsPaid(Boolean(data?.paid));
      } catch (_) {}
    };
    verify();
  }, [success, checkoutSessionId]);

  return (
    <div>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ ...containerStyle, paddingTop: 12, paddingBottom: 12 }}>
          <strong>Lex</strong>
        </div>
      </header>

      <main style={containerStyle}>
        <div style={{ marginBottom: 8, color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{category}</div>
        <h1 style={titleStyle}>{sessionTitle}</h1>
        {suggested && (
          <div style={{ margin: '0 0 16px', color: '#111' }}>
            Sugerido: <strong>{suggested.title}</strong> {suggested.subtitle ? `· ${suggested.subtitle}` : ''} — {suggested.priceEUR} €
          </div>
        )}

        {suggested ? (
          <>
            <section style={{ margin: '16px 0' }}>
              <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Tu sesión</h2>
              <article style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{category || 'Sesión'}</div>
                    <h3 style={{ margin: 0 }}>{suggested.title}</h3>
                    {suggested.subtitle && <div style={{ color: '#6b7280' }}>{suggested.subtitle}</div>}
                  </div>
                  <div style={{ fontWeight: 700 }}>{suggested.priceEUR} €</div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                  <button type="button" style={{ ...buttonStyle, background: '#fff', color: '#000', opacity: isPaid ? 1 : 0.5, cursor: isPaid ? 'pointer' : 'not-allowed' }} onClick={() => isPaid && window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })} disabled={!isPaid}>
                    {isPaid ? 'Elegir fecha' : 'Pagar para reservar'}
                  </button>
                  <button type="button" style={buttonStyle} onClick={() => handleCheckout(suggested)}>
                    Pagar ahora
                  </button>
                </div>
              </article>
            </section>
            {isPaid && (
            <section style={{ margin: '16px 0' }}>
              <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Calendario</h2>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 12, border: '1px solid #e5e7eb' }}>
                <iframe
                  title="Calendly"
                  src={suggested.calendlyUrl}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allowTransparency={true}
                />
              </div>
            </section>
            )}
          </>
        ) : (
          <section style={{ margin: '16px 0' }}>
            <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Elige una opción</h2>
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr' }}>
              {sessionOptions.map((opt) => (
                <article key={opt.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, background: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ color: '#6b7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{category || 'Sesión'}</div>
                      <h3 style={{ margin: 0 }}>{opt.title}</h3>
                      {opt.subtitle && <div style={{ color: '#6b7280' }}>{opt.subtitle}</div>}
                    </div>
                    <div style={{ fontWeight: 700 }}>{opt.priceEUR} €</div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                    <button type="button" style={buttonStyle} onClick={() => handleCheckout(opt)}>
                      Pagar ahora
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {params.get('success') && (
          <section style={{ margin: '24px 0' }}>
            <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Pago completado ✅</h2>
            <p style={{ margin: 0 }}>Gracias. Revisa tu correo con la confirmación.</p>
          </section>
        )}
        {params.get('canceled') && (
          <section style={{ margin: '24px 0' }}>
            <h2 style={{ fontSize: 18, margin: '0 0 8px' }}>Pago cancelado</h2>
            <p style={{ margin: 0 }}>Puedes intentarlo de nuevo cuando quieras.</p>
          </section>
        )}
      </main>
    </div>
  );
}


