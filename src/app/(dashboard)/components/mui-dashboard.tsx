'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Container, Box, Typography, Tab, Tabs, Grid, Paper, Card, CardContent, CardActionArea, Button, Chip, CircularProgress, Avatar, Divider } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BuildIcon from '@mui/icons-material/Build';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Styled components för att skapa konsekvent styling
const GradientCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: 120,
  height: 120,
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  opacity: 0.1,
  right: -30,
  bottom: -30,
  transition: 'transform 0.5s ease-in-out',
}));

// Interface för data
interface DocumentItem {
  title: string;
  type: string;
  date: string;
}

interface GuideItem {
  title: string;
  views: number;
  time: string;
}

interface ToolItem {
  title: string;
  href: string;
}

interface CategoryItem {
  title: string;
  count: number;
  href: string;
}

interface ActivityItem {
  title: string;
  description: string;
  type: string;
  user: string;
  time: string;
}

// TabPanel för att visa innehåll baserat på flik
function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// MUI Dashboard-komponent
export default function MuiDashboard() {
  const theme = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Omdirigera om användaren inte är inloggad
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Hantera tabbyte
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Hantera sökning
  const handleSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };
  
  // Exempeldata
  const recentDocuments: DocumentItem[] = [
    { title: 'Installationsguide - Ny Panel v2.4', type: 'PDF', date: 'Idag 10:24' },
    { title: 'Felsökningsschema - Värmepump', type: 'PDF', date: 'Igår 15:30' },
  ];

  const popularGuides: GuideItem[] = [
    { title: 'Hur man konfigurerar en ny styrenhet', views: 123, time: '5 min' },
    { title: 'Felsökning av kommunikationsfel', views: 98, time: '8 min' },
  ];

  const quickTools: ToolItem[] = [
    { title: 'Mätinsamling', href: '/verktyg/matarinsamling' },
    { title: 'Egenprovning', href: '/verktyg/egenprovning' },
  ];

  const categories: CategoryItem[] = [
    { title: 'Installationsguider', count: 24, href: '/dokumentation/installationsguider' },
    { title: 'Tekniska manualer', count: 35, href: '/dokumentation/manualer' },
    { title: 'Felsökning', count: 18, href: '/dokumentation/felsökning' },
    { title: 'Produktdokument', count: 42, href: '/dokumentation/produktdokument' },
  ];

  const recentActivities: ActivityItem[] = [
    { 
      type: 'document', 
      title: 'Uppdaterad manual för Panel v2.4', 
      description: 'Ny sektion om felsökning och uppdaterad firmware-guide.', 
      user: 'Maria K', 
      time: '2 timmar sedan' 
    },
    { 
      type: 'guide', 
      title: 'Ny how-to guide för uppkoppling mot molntjänst', 
      description: 'Steg-för-steg instruktioner för att konfigurera molnanslutningen.', 
      user: 'Anders S', 
      time: '4 timmar sedan' 
    },
  ];

  // Visar laddningsindikator
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Om användaren inte är autentiserad, visa ingenting
  if (!isAuthenticated) {
    return null;
  }

  // Huvudinnehållet
  return (
    <>
      {/* Hero section with search */}
      <Box sx={{ 
        bgcolor: 'background.default', 
        borderBottom: 1, 
        borderColor: 'divider',
        py: 5,
        px: 3
      }}>
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Hitta information du behöver
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Sök i manualer, how-to guider och dokument i Ekelund Support Center
            </Typography>
            
            <Box sx={{ position: 'relative', mt: 4 }}>
              <SearchIcon sx={{ position: 'absolute', left: 16, top: 16, color: 'text.secondary' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Sök efter dokumentation, guider eller verktyg..."
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 48px',
                  fontSize: '1rem',
                  borderRadius: '8px',
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  outline: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(searchQuery);
                  }
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 3 }}>
              {["Installation", "Felsökning", "Konfiguration", "Manualer"].map((tag, i) => (
                <Chip 
                  key={i}
                  label={tag}
                  variant="outlined"
                  color="primary"
                  clickable
                  onClick={() => handleSearch(tag)}
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Tabbar och innehåll */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="dashboard tabs"
          >
            <Tab label="Populärt innehåll" />
            <Tab label="Kategorier" />
            <Tab label="Uppdateringar" />
          </Tabs>
        </Box>

        {/* Populärt innehåll */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {/* Dokument */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    '& .gradient-circle': {
                      transform: 'scale(1.2)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        mr: 2 
                      }}
                    >
                      <ArticleIcon />
                    </Avatar>
                    <Typography variant="h6">
                      Senaste dokument
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    {recentDocuments.map((doc, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          p: 2, 
                          mb: 1,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateX(5px)',
                            boxShadow: 1
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {doc.title}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            {doc.type}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {doc.date}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button 
                    color="primary" 
                    sx={{ width: '100%', textTransform: 'none' }}
                  >
                    Visa alla dokument
                  </Button>
                </Box>
                <GradientCircle className="gradient-circle" />
              </Paper>
            </Grid>
            
            {/* Guider */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    '& .gradient-circle': {
                      transform: 'scale(1.2)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        mr: 2 
                      }}
                    >
                      <MenuBookIcon />
                    </Avatar>
                    <Typography variant="h6">
                      Populära guider
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    {popularGuides.map((guide, index) => (
                      <Box 
                        key={index}
                        sx={{ 
                          p: 2, 
                          mb: 1,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'translateX(5px)',
                            boxShadow: 1
                          }
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium" sx={{ mb: 0.5 }}>
                          {guide.title}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption" color="text.secondary">
                            {guide.views} visningar
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {guide.time} läsning
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  
                  <Button 
                    color="primary" 
                    sx={{ width: '100%', textTransform: 'none' }}
                  >
                    Visa alla guider
                  </Button>
                </Box>
                <GradientCircle className="gradient-circle" />
              </Paper>
            </Grid>
            
            {/* Verktyg */}
            <Grid item xs={12} md={4}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 3,
                    '& .gradient-circle': {
                      transform: 'scale(1.2)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        mr: 2 
                      }}
                    >
                      <BuildIcon />
                    </Avatar>
                    <Typography variant="h6">
                      Snabbverktyg
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 3 }}>
                    <Grid container spacing={2}>
                      {quickTools.map((tool, index) => (
                        <Grid item xs={6} key={index}>
                          <Card 
                            sx={{ 
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: 2
                              }
                            }}
                          >
                            <CardActionArea 
                              sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                              onClick={() => router.push(tool.href)}
                            >
                              <Avatar 
                                sx={{ 
                                  bgcolor: 'primary.main', 
                                  mb: 1 
                                }}
                              >
                                {index === 0 ? <TrendingUpIcon /> : <BuildIcon />}
                              </Avatar>
                              <Typography variant="body2" fontWeight="medium" align="center">
                                {tool.title}
                              </Typography>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                  
                  <Button 
                    color="primary" 
                    sx={{ width: '100%', textTransform: 'none' }}
                  >
                    Visa alla verktyg
                  </Button>
                </Box>
                <GradientCircle className="gradient-circle" />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Kategorier */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 3
                    }
                  }}
                  onClick={() => router.push(category.href)}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      mx: 'auto',
                      mb: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {index === 0 ? <DescriptionIcon /> : 
                     index === 1 ? <MenuBookIcon /> : 
                     index === 2 ? <BuildIcon /> : 
                     <ArticleIcon />}
                  </Box>
                  
                  <Typography variant="h6" component="h3" align="center" gutterBottom>
                    {category.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" align="center">
                    {category.count} dokument
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Uppdateringar */}
        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Senaste aktiviteter
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  {recentActivities.map((update, i) => (
                    <Box 
                      key={i} 
                      sx={{ 
                        p: 2, 
                        mb: 2, 
                        bgcolor: 'background.default',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(5px)',
                          boxShadow: 1
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        <Box 
                          sx={{ 
                            p: 1, 
                            mr: 2, 
                            bgcolor: 'primary.main', 
                            color: 'primary.contrastText',
                            borderRadius: 1
                          }}
                        >
                          {update.type === 'document' ? <ArticleIcon /> : <MenuBookIcon />}
                        </Box>
                        
                        <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="subtitle2">
                              {update.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {update.time}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {update.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 14, mr: 0.5, color: 'primary.main' }} />
                            <Typography variant="caption" color="primary">
                              Uppdaterad av {update.user}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Kommande uppdateringar
                </Typography>
                
                <Box 
                  sx={{ 
                    mt: 3, 
                    p: 3,
                    borderRadius: 1,
                    bgcolor: 'background.default', 
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      boxShadow: 2
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.primary.light}30)`,
                      right: -30,
                      bottom: -30,
                    }}
                  />
                  
                  <Chip 
                    label="Planerad: 15 juni" 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  
                  <Typography variant="h6" gutterBottom>
                    Nytt supportcenter
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Komplett uppdatering av supportcentret med nya funktioner och förbättrad sökning.
                  </Typography>
                  
                  <Box sx={{ mb: 1 }}>
                    <Box 
                      sx={{ 
                        width: '100%', 
                        height: 8, 
                        bgcolor: 'rgba(0, 0, 0, 0.1)', 
                        borderRadius: 4,
                        mb: 1
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: '75%', 
                          height: '100%', 
                          bgcolor: 'primary.main', 
                          borderRadius: 4 
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      75% färdigt
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mt: 3, p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2">
                        Senaste versionen: v2.4.1
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Släppt 28 maj, 2024
                      </Typography>
                    </Box>
                    <Button color="primary" size="small">
                      Release notes
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </>
  );
}