import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.css';

function Home() {
    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            px: 3,
        }}>
            {/* Decorative blobs */}
            <Box sx={{
                position: 'absolute',
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,229,195,0.08) 0%, transparent 70%)',
                top: '-100px',
                right: '-100px',
                pointerEvents: 'none',
            }} />
            <Box sx={{
                position: 'absolute',
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,106,247,0.08) 0%, transparent 70%)',
                bottom: '-80px',
                left: '-80px',
                pointerEvents: 'none',
            }} />

            {/* Grid pattern overlay */}
            <Box sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '48px 48px',
                pointerEvents: 'none',
            }} />

            {/* Content */}
            <Box sx={{
                position: 'relative',
                textAlign: 'center',
                animation: 'fadeUp 0.6s ease forwards',
                maxWidth: 680,
            }}>
                {/* Badge */}
                <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.5,
                    py: 0.75,
                    mb: 4,
                    borderRadius: '100px',
                    border: '1px solid rgba(0, 229, 195, 0.3)',
                    background: 'rgba(0, 229, 195, 0.08)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box sx={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        bgcolor: 'var(--accent-primary)',
                        animation: 'pulse-glow 2s infinite',
                    }} />
                    <Typography sx={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.05em',
                    }}>
                        ניהול פרויקטים חכם
                    </Typography>
                </Box>

                {/* Main heading */}
                <Typography variant="h1" sx={{
                    fontFamily: 'var(--font-body)',
                    fontSize: { xs: '2.8rem', md: '4.5rem' },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-2px',
                    mb: 3,
                    color: 'var(--text-primary)',
                    '& span': {
                        background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }
                }}>
                    נהל את הפרויקטים שלך<br />
                    <span>בצורה חכמה יותר</span>
                </Typography>

                <Typography sx={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.15rem',
                    mb: 5,
                    lineHeight: 1.8,
                    maxWidth: 480,
                    mx: 'auto',
                }}>
                    פלטפורמה מתקדמת לניהול משימות, מעקב אחר פרויקטים ושיתוף פעולה בצוות — הכל במקום אחד.
                </Typography>

                {/* CTA */}
                <Link to='/Login' style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            fontFamily: 'var(--font-body)',
                            fontWeight: 700,
                            fontSize: '1rem',
                            px: 5,
                            py: 1.75,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #00e5c3 0%, #7c6af7 100%)',
                            color: '#0d1117',
                            textTransform: 'none',
                            boxShadow: '0 8px 32px rgba(0, 229, 195, 0.3)',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #00f5d3 0%, #8c7aff 100%)',
                                transform: 'translateY(-3px)',
                                boxShadow: '0 12px 40px rgba(0, 229, 195, 0.45)',
                            }
                        }}
                    >
                        התחבר עכשיו →
                    </Button>
                </Link>

                {/* Stats row */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: { xs: 3, md: 6 },
                    mt: 7,
                    flexWrap: 'wrap',
                }}>
                    {[
                        { value: 'Kanban', label: 'לוח משימות' },
                        { value: '∞', label: 'פרויקטים' },
                        { value: '100%', label: 'מאובטח' },
                    ].map((stat) => (
                        <Box key={stat.label} sx={{ textAlign: 'center' }}>
                            <Typography sx={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '1.5rem',
                                fontWeight: 700,
                                color: 'var(--accent-primary)',
                                lineHeight: 1,
                                mb: 0.5,
                            }}>
                                {stat.value}
                            </Typography>
                            <Typography sx={{
                                fontSize: '0.8rem',
                                color: 'var(--text-muted)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}>
                                {stat.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default Home;
