'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { Document, DocumentType, DocumentsDB } from '@/lib/offline/document-db';

// MUI imports
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  CardHeader,
  Avatar,
  Divider,
  Button,
  Alert,
  CircularProgress,
  Skeleton
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DescriptionIcon from '@mui/icons-material/Description';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FolderIcon from '@mui/icons-material/Folder';

// Document viewer component
const DocumentViewer = ({ documentId, onClose }: { documentId: string; onClose: () => void }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [content, setContent] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load document when component mounts
  useEffect(() => {
    const loadDocument = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get document metadata
        const metadata = await DocumentsDB.getDocument(documentId);
        
        if (!metadata) {
          throw new Error(`Document with ID ${documentId} not found`);
        }
        
        setDocument(metadata);
        
        // Increment view counter
        await DocumentsDB.viewDocument(documentId);
        
        // Get document content
        const documentContent = await DocumentsDB.getDocumentContent(documentId);
        
        if (documentContent) {
          setContent(documentContent.content);
        }
      } catch (error) {
        console.error('Error loading document:', error);
        setError('Kunde inte ladda dokumentet. Försök igen senare.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDocument();
  }, [documentId]);
  
  // Format date
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Okänt datum';
    return new Date(date).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Format file size
  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'Okänd storlek';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  };
  
  // Get icon based on document type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'manual':
        return <MenuBookIcon color="info" />;
      case 'guide':
        return <DescriptionIcon color="success" />;
      default:
        return <ArticleIcon color="primary" />;
    }
  };
  
  // Render content based on document type
  const renderContent = () => {
    if (!content) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Inget innehåll tillgängligt för detta dokument.
          </Typography>
        </Box>
      );
    }
    
    if (document?.type === 'pdf' || (document?.fileType && document.fileType.includes('pdf'))) {
      // For PDF show PDF viewer or download link
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
          <PictureAsPdfIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>PDF-dokument</Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<FileDownloadIcon />}
            >
              Ladda ner
            </Button>
            
            <Button 
              variant="outlined" 
              startIcon={<VisibilityIcon />}
            >
              Visa
            </Button>
          </Box>
        </Box>
      );
    }
    
    // For text-based documents
    if (typeof content === 'string') {
      if (document?.type === 'guide' || document?.type === 'manual') {
        // Markdown or HTML content
        return (
          <Box sx={{ p: 3 }} className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Box>
        );
      }
      
      // Plain text content
      return (
        <Box 
          sx={{ 
            p: 3, 
            whiteSpace: 'pre-wrap',
            fontFamily: 'var(--font-sans)'
          }}
        >
          {content}
        </Box>
      );
    }
    
    // For binary documents we cannot display
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
        <ArticleIcon sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Det här dokumentet kan inte visas i webbläsaren.
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<FileDownloadIcon />}
          sx={{ mt: 2 }}
        >
          Ladda ner
        </Button>
      </Box>
    );
  };
  
  // Show loading skeleton
  if (isLoading) {
    return (
      <Paper sx={{ p: 3 }}>
        <Skeleton variant="rectangular" height={40} width="60%" sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={20} width="40%" sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={400} />
      </Paper>
    );
  }
  
  // Show error message
  if (error || !document) {
    return (
      <Paper sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Dokumentet kunde inte hittas.'}
          </Alert>
          
          {onClose && (
            <Button 
              variant="contained" 
              onClick={onClose}
            >
              Tillbaka
            </Button>
          )}
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header with document info */}
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {document.title}
            </Typography>
            {document.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {document.description}
              </Typography>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {document.tags.map((tag: string, i: number) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))}
            </Box>
          </Box>
          
          {onClose && (
            <Button 
              onClick={onClose}
              variant="outlined"
              startIcon={<ArrowBackIcon />}
            >
              Tillbaka
            </Button>
          )}
        </Box>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Typ: {document.type === 'pdf' ? 'PDF' : 
                    document.type === 'manual' ? 'Manual' : 
                    document.type === 'guide' ? 'Guide' : 
                    document.type === 'datasheet' ? 'Datablad' : 
                    document.type === 'installation' ? 'Installation' : 'Dokument'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Datum: {formatDate(document.updatedAt)}
            </Typography>
          </Grid>
          {document.fileSize && (
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Storlek: {formatFileSize(document.fileSize)}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} sm={3}>
            <Typography variant="body2" color="text.secondary">
              Visningar: {document.views}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      
      {/* Document content */}
      <Box sx={{ bgcolor: 'background.paper', overflowY: 'auto', maxHeight: '70vh' }}>
        {renderContent()}
      </Box>
    </Paper>
  );
};

// Main component
export default function MuiDocumentationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; parentId?: string }[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedType, setSelectedType] = useState<DocumentType | ''>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  
  // Get initial document param
  const docIdParam = searchParams?.get('id');
  
  // Redirect if user is not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // Set selectedDocument from URL param
    if (docIdParam) {
      setSelectedDocument(docIdParam);
    }
  }, [isAuthenticated, isLoading, router, docIdParam]);
  
  // Load data
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, selectedType, selectedCategoryId, searchTerm]);
  
  // Fetch documents and categories
  const loadData = async () => {
    setIsLoadingData(true);
    
    try {
      // Get categories
      const categoriesData = await DocumentsDB.getCategories();
      setCategories(categoriesData);
      
      // Build filter for documents
      const filter: any = {};
      
      if (selectedType) {
        filter.type = selectedType;
      }
      
      if (selectedCategoryId) {
        filter.categoryId = selectedCategoryId;
      }
      
      if (searchTerm) {
        filter.search = searchTerm.trim();
      }
      
      // Get documents
      const documentsData = await DocumentsDB.getDocuments(filter);
      setDocuments(documentsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Handle document click
  const handleDocumentClick = (docId: string) => {
    setSelectedDocument(docId);
    
    // Update URL without page reload
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('id', docId);
    router.push(`/dokumentation?${params.toString()}`);
  };
  
  // Close document viewer
  const handleCloseViewer = () => {
    setSelectedDocument(null);
    
    // Update URL without page reload
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('id');
    router.push(`/dokumentation?${params.toString()}`);
  };
  
  // Show loading indicator if we're checking authentication
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  // If user is not authenticated, show nothing (redirect handled by useEffect)
  if (!isAuthenticated) {
    return null;
  }
  
  // If a document is selected, show document viewer
  if (selectedDocument) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DocumentViewer
          documentId={selectedDocument}
          onClose={handleCloseViewer}
        />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dokumentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bläddra och sök i vår dokumentation, manualer och guider.
        </Typography>
      </Box>
      
      {/* Filters and search */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Search field */}
          <Grid item xs={12} md={4}>
            <TextField
              label="Sök"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Sök i dokumentation..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          {/* Document type filter */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="doc-type-label">Dokumenttyp</InputLabel>
              <Select
                labelId="doc-type-label"
                value={selectedType}
                label="Dokumenttyp"
                onChange={(e) => setSelectedType(e.target.value as DocumentType | '')}
              >
                <MenuItem value="">Alla typer</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="manual">Manualer</MenuItem>
                <MenuItem value="guide">Guider</MenuItem>
                <MenuItem value="datasheet">Datablad</MenuItem>
                <MenuItem value="installation">Installation</MenuItem>
                <MenuItem value="other">Övrigt</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          {/* Category filter */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Kategori</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategoryId}
                label="Kategori"
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <MenuItem value="">Alla kategorier</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Document list */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Dokument 
            {documents.length > 0 && (
              <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                ({documents.length})
              </Typography>
            )}
          </Typography>
          
          <Button
            variant="contained"
            startIcon={<ArticleIcon />}
          >
            Nytt dokument
          </Button>
        </Box>
        
        {isLoadingData ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card>
                  <CardContent>
                    <Skeleton variant="rectangular" height={24} width="70%" sx={{ mb: 1 }} />
                    <Skeleton variant="rectangular" height={16} width="50%" sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={20} width="30%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : documents.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <FolderIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Inga dokument hittades
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm || selectedType || selectedCategoryId 
                ? 'Inga dokument matchar dina filterkriterier. Försök med andra inställningar.'
                : 'Det finns ännu inga dokument i systemet. Klicka på "Nytt dokument" för att lägga till ett.'}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {documents.map((doc) => {
              // Get icon based on document type
              const getIcon = () => {
                switch (doc.type) {
                  case 'pdf':
                    return <PictureAsPdfIcon />;
                  case 'manual':
                    return <MenuBookIcon />;
                  case 'guide':
                    return <DescriptionIcon />;
                  default:
                    return <ArticleIcon />;
                }
              };
              
              // Get color based on document type
              const getColor = () => {
                switch (doc.type) {
                  case 'pdf':
                    return 'error';
                  case 'manual':
                    return 'info';
                  case 'guide':
                    return 'success';
                  default:
                    return 'primary';
                }
              };
              
              return (
                <Grid item xs={12} sm={6} md={4} key={doc.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardActionArea 
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                      onClick={() => handleDocumentClick(doc.id)}
                    >
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: `${getColor()}.main` }}>
                            {getIcon()}
                          </Avatar>
                        }
                        title={doc.title}
                        subheader={formatDate(doc.updatedAt)}
                        titleTypographyProps={{ noWrap: true }}
                      />
                      <CardContent sx={{ pt: 0 }}>
                        {doc.description && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical'
                            }}
                          >
                            {doc.description}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {doc.tags.slice(0, 3).map((tag: string, i: number) => (
                            <Chip
                              key={i}
                              label={tag}
                              size="small"
                              variant="outlined"
                              color="primary"
                            />
                          ))}
                          {doc.tags.length > 3 && (
                            <Chip
                              label={`+${doc.tags.length - 3}`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            <VisibilityIcon sx={{ fontSize: 14, mr: 0.5 }} /> {doc.views}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {doc.categoryName || 'Okategoriserad'}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Container>
  );
}