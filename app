import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Box,
  Checkbox,
  FormControlLabel,
  styled
} from '@mui/material';
import { Close, ChevronRight } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import Grid from "@mui/material/Grid2";  // ✅ correct


// ---------------- Styled Components ----------------
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '95vw',
    height: '95vh',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
}));

const RedDialogTitle = styled(DialogTitle)(() => ({
  backgroundColor: '#504848ff',
  color: 'white',
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiTypography-root': {
    fontSize: '16px',
    fontWeight: 500,
  },
}));

const RedButton = styled(Button)(() => ({
  backgroundColor: '#c62828',
  color: 'white',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
}));

// ---------------- Types ----------------
interface FormData {
  solutionName: string;
  sectionType: string;
  requestedYear: string;
  primaryRationale: string;
  porYear: string;
  useOffloadProvision: boolean;
  overrideSpectrum: boolean;
}

interface Option {
  value: string;
  label: string;
}

interface Options {
  sectionTypeList: Option[];
  requestedYearsList: Option[];
  primaryRationaleList: Option[];
  porYearList: Option[];
}

interface RowData {
  InFlightParentId: string;
  uneFiProjectType: string;
  FuzeSiteId: string;
  FuzeSiteType: string;
}

interface CreateMinionSolutionModalProps {
  open: boolean;
  onClose: () => void;
  initialId?: string | null;
  rowData: RowData;
}

// ---------------- Main Modal ----------------
const CreateMinionSolutionModal: React.FC<CreateMinionSolutionModalProps> = ({
  open,
  onClose,
  initialId = null,
  rowData
}) => {
  const [formData, setFormData] = useState<FormData>({
    solutionName: '',
    sectionType: 'Modification',
    requestedYear: 'None',
    primaryRationale: 'None',
    porYear: 'None',
    useOffloadProvision: true,
    overrideSpectrum: false,
  });

  const [options, setOptions] = useState<Options>({
    sectionTypeList: [{ value: "1", label: "Modification" }],
    requestedYearsList: [{ value: "1", label: "2025" }],
    primaryRationaleList: [{ value: "1", label: "Modification" }],
    porYearList: [{ value: "1", label: "2025" }]
  });

  // Handle input change
  const handleInputChange =
    (field: keyof FormData) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const value =
        'target' in event &&
        (event.target as HTMLInputElement).type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : (event.target as HTMLInputElement).value;

      setFormData(prev => ({ ...prev, [field]: value as any }));
    };

  // ---------------- Sections ----------------
  const HeaderSection: React.FC = () => (
    <Box component="section" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size ={3}>
          <TextField
            label="Solution Name *"
            value={formData.solutionName}
            onChange={handleInputChange('solutionName')}
            size="small"
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid size ={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Section Type *</InputLabel>
            <Select
              value={formData.sectionType}
              onChange={handleInputChange('sectionType')}
              label="Section Type *"
            >
              {options.sectionTypeList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size ={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Requested Year *</InputLabel>
            <Select
              value={formData.requestedYear}
              onChange={handleInputChange('requestedYear')}
              label="Requested Year *"
            >
              {options.requestedYearsList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size ={3}>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.useOffloadProvision}
                  onChange={handleInputChange('useOffloadProvision')}
                  size="small"
                />
              }
              label="Use Offload Provision"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.overrideSpectrum}
                  onChange={handleInputChange('overrideSpectrum')}
                  size="small"
                />
              }
              label="Override Spectrum"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const SecondSection: React.FC = () => (
    <Box component="section" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size ={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Primary Rationale *</InputLabel>
            <Select
              value={formData.primaryRationale}
              onChange={handleInputChange('primaryRationale')}
              label="Primary Rationale *"
            >
              {options.primaryRationaleList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size ={3}>
          <FormControl fullWidth size="small">
            <InputLabel>POR Year *</InputLabel>
            <Select
              value={formData.porYear}
              onChange={handleInputChange('porYear')}
              label="POR Year *"
            >
              {options.porYearList.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size ={3}>
          <RedButton
            variant="contained"
            size="small"
            fullWidth
            endIcon={<ChevronRight />}
          >
            Fuze Sync Pull
          </RedButton>
        </Grid>
      </Grid>
    </Box>
  );

  const ThirdSection: React.FC = () => {
    const isOverrideSpectrum = formData.overrideSpectrum;
    const gridSize = isOverrideSpectrum ? 2 : 3;

    const fields = [
      {
        id: 'inflightParentId',
        label: 'InFlight ParentId *',
        value: rowData.InFlightParentId,
        disabled: true,
        size: 3,
      },
      ...(isOverrideSpectrum
        ? [
            {
              id: 'primaryRationale',
              label: 'Primary Rationale *',
              value: formData.primaryRationale || '',
              disabled: false,
              size: 3,
              onChange: handleInputChange('primaryRationale'),
            },
          ]
        : []),
      {
        id: 'uneFiProjectType',
        label: 'UneFi ProjectType *',
        value: rowData.uneFiProjectType,
        disabled: true,
        size: gridSize,
      },
      {
        id: 'fuzeSiteId',
        label: 'Fuze SiteId',
        value: rowData.FuzeSiteId,
        disabled: true,
        size: gridSize,
      },
      {
        id: 'fuzeSiteType',
        label: 'Fuze SiteType',
        value: rowData.FuzeSiteType,
        disabled: true,
        size: gridSize,
      },
    ];

    return (
      <Box component="section" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {fields.map(({ id, label, value, disabled, size, onChange }) => (
            <Grid size={size} key={id}>
              <TextField
                label={label}
                value={value}
                disabled={disabled}
                onChange={onChange as any}
                size="small"
                fullWidth
                variant="outlined"
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth={false} fullWidth>
      <RedDialogTitle>
        <Typography variant="h6">Create Minion Solution</Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </RedDialogTitle>

      <DialogContent>
        <HeaderSection />
        <SecondSection />
        <ThirdSection />
      </DialogContent>
    </StyledDialog>
  );
};

// ---------------- Demo Component ----------------
const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Open Modal
      </Button>
      <CreateMinionSolutionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        rowData={{
          InFlightParentId: 'data',
          uneFiProjectType: 'data',
          FuzeSiteId: 'data',
          FuzeSiteType: 'data',
        }}
      />
    </Box>
  );
};

export default App;
