import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: 'pending' | 'uploaded' | 'verified' | 'rejected';
  file?: File;
}

const requiredDocuments: Document[] = [
  {
    id: 'photo',
    name: 'Passport Size Photo',
    description: 'Recent passport size photograph with white background',
    required: true,
    status: 'pending',
  },
  {
    id: 'identity',
    name: 'Identity Proof',
    description: 'Aadhaar Card, PAN Card, or Voter ID',
    required: true,
    status: 'pending',
  },
  {
    id: 'address',
    name: 'Address Proof',
    description: 'Utility bill, rental agreement, or passport',
    required: true,
    status: 'pending',
  },
  {
    id: 'medical',
    name: 'Medical Certificate',
    description: 'Form 1A from registered medical practitioner',
    required: true,
    status: 'pending',
  },
];

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>(requiredDocuments);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = async (documentId: string, file: File) => {
    setUploading(true);
    setError(null);

    try {
      // Simulate file upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update document status
      setDocuments(documents.map(doc =>
        doc.id === documentId
          ? { ...doc, status: 'uploaded', file }
          : doc
      ));

      setSuccess(`${file.name} uploaded successfully`);
    } catch (err) {
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'rejected':
        return 'error';
      case 'uploaded':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircleIcon color="success" />;
      case 'rejected':
        return <ErrorIcon color="error" />;
      case 'uploaded':
        return <CloudUploadIcon color="warning" />;
      default:
        return <DescriptionIcon />;
    }
  };

  const allDocumentsUploaded = documents.every(
    doc => doc.required ? doc.status !== 'pending' : true
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Document Upload
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Please upload all required documents for your license application.
          Supported formats: PDF, JPG, PNG (max 5MB each)
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <List>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                mb: 2,
                bgcolor: 'background.paper',
              }}
            >
              <ListItemIcon>
                {getStatusIcon(doc.status)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {doc.name}
                    {doc.required && (
                      <Chip
                        label="Required"
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    {doc.description}
                    {doc.file && (
                      <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                        File: {doc.file.name}
                      </Typography>
                    )}
                  </>
                }
              />
              <Box sx={{ ml: 2, minWidth: 100 }}>
                <input
                  type="file"
                  id={`file-${doc.id}`}
                  style={{ display: 'none' }}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(doc.id, file);
                    }
                  }}
                />
                <label htmlFor={`file-${doc.id}`}>
                  <Button
                    component="span"
                    variant={doc.status === 'pending' ? 'contained' : 'outlined'}
                    disabled={uploading}
                    fullWidth
                  >
                    {uploading ? (
                      <CircularProgress size={24} />
                    ) : doc.status === 'pending' ? (
                      'Upload'
                    ) : (
                      'Replace'
                    )}
                  </Button>
                </label>
                <Chip
                  label={doc.status.toUpperCase()}
                  size="small"
                  color={getStatusColor(doc.status)}
                  sx={{ mt: 1, width: '100%' }}
                />
              </Box>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="primary">
            Save Progress
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!allDocumentsUploaded}
          >
            Submit for Verification
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DocumentUpload; 