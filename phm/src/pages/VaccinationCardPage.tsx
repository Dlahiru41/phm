import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VaccinationCardPayload } from '../types/models';
import { VaccinationCardService } from '../services/VaccinationCardService';

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmt = (iso: string | Date): string =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const ageFromDOB = (dob: string | Date): string => {
  const today = new Date();
  const birth = new Date(dob);
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return years > 0 ? `${years}y ${months}m` : `${months} months`;
};

const initials = (name: string): string =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

const statusStyles: Record<
  string,
  { bg: string; color: string; dot: string; label: string }
> = {
  administered: {
    bg: '#E1F5EE',
    color: '#0F6E56',
    dot: '#1D9E75',
    label: 'Administered',
  },
  pending: {
    bg: '#FAEEDA',
    color: '#854F0B',
    dot: '#EF9F27',
    label: 'Pending',
  },
  overdue: {
    bg: '#FCEBEB',
    color: '#A32D2D',
    dot: '#E24B4A',
    label: 'Overdue',
  },
};

// ── Card component (also the PDF target) ──────────────────────────────────────

interface VaccinationCardViewProps {
  data: VaccinationCardPayload;
}

function VaccinationCardView({ data }: VaccinationCardViewProps) {
  const { child, vaccinationHistory, generatedAt } = data;

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        background: '#fff',
        border: '1.5px solid #B4E8D6',
        borderRadius: 16,
        overflow: 'hidden',
        maxWidth: 640,
        margin: '0 auto',
      }}
    >
      {/* Header band */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: '#fff' }}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <p
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: 11,
              margin: 0,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            National Child Vaccination Programme
          </p>
          <h2
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              margin: '2px 0 0',
            }}
          >
            Child Vaccination Card
          </h2>
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, margin: 0 }}>
            Generated
          </p>
          <p style={{ color: '#fff', fontSize: 12, fontWeight: 500, margin: 0 }}>
            {fmt(generatedAt)}
          </p>
        </div>
      </div>

      {/* Child info */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E1F5EE',
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#E1F5EE',
            border: '2px solid #1D9E75',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: '#0F6E56',
            flexShrink: 0,
          }}
        >
          {initials(child.name)}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 17, fontWeight: 600, color: '#1a1a1a' }}>
            {child.name}
          </h3>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: 12,
                color: '#5a7a6e',
                background: '#E1F5EE',
                padding: '2px 10px',
                borderRadius: 20,
              }}
            >
              {child.gender.charAt(0).toUpperCase() + child.gender.slice(1)}
            </span>
            <span
              style={{
                fontSize: 12,
                color: '#5a7a6e',
                background: '#E1F5EE',
                padding: '2px 10px',
                borderRadius: 20,
              }}
            >
              Age {ageFromDOB(child.dateOfBirth)}
            </span>
          </div>
        </div>

        {/* DOB + Reg */}
        <div style={{ textAlign: 'right', fontSize: 12 }}>
          <p style={{ color: '#888', margin: '0 0 4px' }}>Date of Birth</p>
          <p style={{ color: '#1a1a1a', fontWeight: 500, margin: '0 0 8px' }}>
            {fmt(child.dateOfBirth)}
          </p>

          <p style={{ color: '#888', margin: '0 0 2px' }}>Reg. No.</p>
          <p
            style={{
              color: '#0F6E56',
              fontWeight: 500,
              margin: 0,
              fontSize: 11,
              fontFamily: 'monospace',
            }}
          >
            {child.registrationNumber}
          </p>
        </div>
      </div>

      {/* Vaccination history */}
      <div style={{ padding: '16px 24px 0' }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: '#888',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            margin: '0 0 12px',
          }}
        >
          Vaccination History
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid #E1F5EE' }}>
              {['Vaccine', 'Dose #', 'Date Given', 'Next Due', 'Status'].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    padding: '6px 8px 10px',
                    color: '#888',
                    fontWeight: 500,
                    fontSize: 11,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vaccinationHistory.map((v, i) => {
              const s = statusStyles[v.status] ?? statusStyles.pending;
              return (
                <tr key={i} style={{ borderBottom: '1px solid #f0f7f5' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 600, color: '#1a1a1a' }}>
                    {v.vaccineName}
                  </td>
                  <td style={{ padding: '10px 8px', color: '#444', textAlign: 'center' }}>
                    <span
                      style={{
                        background: '#E1F5EE',
                        color: '#0F6E56',
                        borderRadius: 4,
                        padding: '2px 8px',
                        fontWeight: 600,
                      }}
                    >
                      {v.doseNumber}
                    </span>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#444' }}>
                    {fmt(v.dateGiven)}
                  </td>
                  <td style={{ padding: '10px 8px', color: '#444' }}>
                    {fmt(v.nextDueDate)}
                  </td>
                  <td style={{ padding: '10px 8px' }}>
                    <span
                      style={{
                        background: s.bg,
                        color: s.color,
                        borderRadius: 20,
                        padding: '3px 10px',
                        fontSize: 11,
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: s.dot,
                          display: 'inline-block',
                        }}
                      />
                      {s.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '16px 24px',
          marginTop: 8,
          borderTop: '1px solid #E1F5EE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: 10, color: '#aaa', margin: 0 }}>
          Child ID: <span style={{ fontFamily: 'monospace' }}>{child.childId}</span>
        </p>
        <p style={{ fontSize: 10, color: '#aaa', margin: 0 }}>
          Issued by NCVMS · Ministry of Health, Sri Lanka
        </p>
      </div>
    </div>
  );
}

// ── Main exported component ────────────────────────────────────────────────────

interface VaccinationCardPageParams {
  childId: string;
}

export default function VaccinationCardPage() {
  const { childId } = useParams<keyof VaccinationCardPageParams>();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<VaccinationCardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch vaccination card data on component mount
  useEffect(() => {
    const fetchVaccinationCard = async () => {
      if (!childId) {
        setError('Child ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const cardData = await VaccinationCardService.getChildVaccinationCard(childId);
        setData(cardData);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load vaccination card';
        setError(errorMessage);
        console.error('Error fetching vaccination card:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinationCard();
  }, [childId]);

  const handleDownload = async () => {
    if (!cardRef.current || !data || downloading) return;

    setDownloading(true);
    setError(null);

    try {
      // Hide toolbar during print
      const toolbar = cardRef.current.parentElement?.querySelector('[style*="space-between"]');
      const errorDiv = cardRef.current.parentElement?.querySelector('[style*="FCEBEB"]');

      if (toolbar) toolbar.style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';

      // Set up print styles
      const printStyle = document.createElement('style');
      printStyle.innerHTML = `
        @media print {
          body * {
            visibility: hidden;
          }
          #vaccination-card-container, #vaccination-card-container * {
            visibility: visible;
          }
          #vaccination-card-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          @page {
            size: A4;
            margin: 10mm;
          }
        }
      `;
      document.head.appendChild(printStyle);

      // Mark the card container for printing
      cardRef.current.id = 'vaccination-card-container';

      // Trigger print dialog
      window.print();

      // Handle after print
      window.addEventListener('afterprint', () => {
        // Show toolbar again
        if (toolbar) toolbar.style.display = 'flex';
        if (errorDiv) errorDiv.style.display = 'block';

        // Remove print styles
        document.head.removeChild(printStyle);
        cardRef.current.id = '';

        setDownloading(false);
      }, { once: true });

      // Also handle if user cancels print
      setTimeout(() => {
        if (downloading) {
          if (toolbar) toolbar.style.display = 'flex';
          if (errorDiv) errorDiv.style.display = 'block';
          document.head.removeChild(printStyle);
          cardRef.current.id = '';
          setDownloading(false);
        }
      }, 3000);
    } catch (err) {
      console.error('Print failed:', err);
      setError('Could not open print dialog. Please try again.');
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          maxWidth: 680,
          margin: '0 auto',
          padding: '24px 16px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 14, color: '#888' }}>Loading vaccination card...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          maxWidth: 680,
          margin: '0 auto',
          padding: '24px 16px',
        }}
      >
        <div
          style={{
            background: '#FCEBEB',
            border: '1px solid #F09595',
            borderRadius: 8,
            padding: '16px',
            marginBottom: 16,
            fontSize: 14,
            color: '#A32D2D',
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        maxWidth: 680,
        margin: '0 auto',
        padding: '24px 16px',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          gap: 16,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#E1F5EE',
            color: '#0F6E56',
            border: '1px solid #B4E8D6',
            borderRadius: 8,
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#D4EDEA';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#E1F5EE';
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#1a1a1a' }}>
            Card Preview
          </h1>
          <p style={{ fontSize: 12, color: '#888', margin: '3px 0 0' }}>
            {data?.fileName || 'vaccination-card.pdf'}
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading || !data}
          title="Press Ctrl+P or click to print (then save as PDF)"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: downloading ? '#E1F5EE' : '#0F6E56',
            color: downloading ? '#0F6E56' : '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '10px 20px',
            fontSize: 13,
            fontWeight: 600,
            cursor: downloading || !data ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          {downloading ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Opening Print…
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print (Ctrl+P)
            </>
          )}
        </button>
      </div>

      {error && (
        <div
          style={{
            background: '#FCEBEB',
            border: '1px solid #F09595',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 16,
            fontSize: 13,
            color: '#A32D2D',
          }}
        >
          {error}
        </div>
      )}

      {/* Card preview — this DOM node is captured by html2canvas */}
      <div
        ref={cardRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {data && <VaccinationCardView data={data} />}
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

