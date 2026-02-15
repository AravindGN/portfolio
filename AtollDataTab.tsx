import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import jspreadsheet from '../helpers/jsspreadsheet';
import { atollDataColumns } from '../helpers/columns';
import { getPaginatedData, createSpreadsheetConfig } from '../helpers/config';
import type { TabProps, AtollDataRow } from '../types';

function AtollDataTab({ rows, loading, currentPage, rowsPerPage }: TabProps<AtollDataRow>): JSX.Element {
    const spreadsheetRef = useRef<HTMLDivElement | null>(null);
    const spreadsheetInstance = useRef<any>(null);

    // Carrier dropdown options
    const carrierOptions = [
        'B2_15MHz_1025',
        'B4_20MHz_2050',
        'B5_10MHz_2560',
        'B13_10MHz_5230',
        'B66_15MHz_132672',
        'Bn261_100MHz_2073333',
        'Bn261_100MHz_2074999',
        'Bn261_100MHz_2076665',
        'Bn261_100MHz_2080833',
        'Bn261_100MHz_2082499',
        'Bn261_100MHz_2084165'
    ];

    // Carrier Band dropdown options
    const carrierBandOptions = [
        '2',
        '4',
        '5',
        '12',
        '13',
        '66',
        'n2',
        'n5',
        'n66',
        'n261'
    ];

    // Band Info dropdown options
    const bandInfoOptions = [
        '2',
        '4',
        '5',
        '12',
        '13',
        '66',
        'n2',
        'n5',
        'n66',
        'n261'
    ];

    const convertRowsToArrays = (dataRows: AtollDataRow[]) => {
        console.log("dataRows",dataRows)
        if (!dataRows || dataRows.length === 0) return [Array(atollDataColumns.length).fill('')];
        return dataRows.map(row => ({
            bandClass: row.bandClass || '',
            carrier: row.carrier || '',
            sector: row.sector || '',
            enodebName: row.gnbEnbName || '',
            siteName: row.siteName || '',
            fuzeSiteId: row.fuzeSiteId || '',
            siteRecordId: row.siteRecordId || '',
            siteNumber: row.siteNumber || '',
            siteVersion: row.siteVersion || '',
            supportHeight: row.supportHeightFt || '',
            transmitterName: row.transmitterName || '',
            transmitterRecordId: row.transmitterRecordId || '',
            azimuthDeg: row.azimuthDeg || '',
            antennaManufacturer: row.antennaManufacturer || '',
            antennaModel: row.antennaModel || '',
            antennaOrderablePartName: row.antennaOrderablePartName || '',
            antennaMaxGainDbD: row.antennaMaxGainDbD || '',
            antennaHBw: row.antennaHBwDeg || '',
            antennaHeight: row.antennaHeightIn || '',
            antennaWidth: row.antennaWidthIn || '',
            antennaDepth: row.antennaDepthIn || '',
            antennaWeight: row.antennaWeightLbs || '',
            antennaCenterline: row.antennaCenterlineFt || '',
            antennaTipHeight: row.antennaTipHeightFt || '',
            mechanicalTilt: row.mechanicalTiltDeg || '',
            antennaPatternElectricalTilt: row.antennaPatternElectricalTiltDeg || '',
            additionalElectricalTilt: row.additionalElectricalTiltDeg || '',
            rrhManufacturer: row.rrhManufacturer || '',
            rrhModelName: row.rrhModelName || '',
            radioLocation: row.radioLocation || '',
            tmaModel: row.tmaModel || '',
            tmaManufacturer: row.tmaManufacturer || '',
            eNodeBId: row.eNodeBId || '',
            maxErp: row.maxErpW || '',
            maxErpAlt: row.alternateMaxErpW || '',
            totalErp: row.totalErpW || '',
            carrierBand: row.carrierBand || '',
            bandInfo: row.bandInfo || '',
            airInterface: row.airInterface || '',
            radioAccessTechnology: row.radioAccessTechnology || '',
            centerChannel: row.centerChannel || '',
            channelBandwidth: row.channelBandwidthMhz || '',
            cellId: row.cellId || '',
            numberOfTxAntennaPo: row.numberOfTxAntennaPo || '',
            numberOfRxAntennaPo: row.numberOfRxAntennaPo || '',
            sharedAntenna: row.sharedAntenna || '',
            mountPosition: row.mountPosition || '',
            mountFace: row.antennaSector || '',
            gnbEnbVendor: row.gnbEnbVendor || '',
            cellDlTotalPower: row.cellDlTotalPowerDbm || '',
            configuredMaxTxPower: row.configuredMaxTxPower || '',
            pMaxDbm: row.pMaxDbm || '',
            diMaxTxPower: row.diMaxTxPower || '',
            regulatoryPower: row.regulatoryPower || '',
            regulatoryPowerLimit: row.regulatoryPowerLimit || '',
            nonPsdRegulatoryPower: row.nonPsdRegulatoryPower || '',
            regulatoryPowerUnitless: row.regulatoryPowerUnitless || '',
            nonPsdRegulatoryPowerUnitless: row.nonPsdRegulatoryPowerUnitless || '',
            alternateRegulatoryPowerW: row.alternateRegulatoryPowerW || '',
            gnbDuNumber: row.gnbDuNumber || '',
            gnbDuName: row.gnbDuName || '',
            isRepeater: row.isRepeater || '',
            donorTxId: row.donorTxId || '',
            donorSector: row.donorSector || '',
            donorGnbEnb: row.donorGnbEnb || '',
            donorAirInterface: row.donorAirInterface || '',
            donorEnodebId: row.donorEnodebId || '',
            donorFrequency: row.donorFrequency || '',
            donorBadInfo: row.donorBadInfo || '',
            donorBandClass: row.donorBandClass || '',
            donorCenterChannel: row.donorCenterChannel || '',
            donorChannelBandwidth: row.donorChannelBandwidth || '',
            antennaModelDonorSi: row.antennaModelDonorSi || '',
            antennaTipHeightFtDonorS: row.antennaTipHeightFtDonorS || '',
            azimuthDegDonorSide: row.azimuthDegDonorSide || '',
            mechanicalTiltDegDonorSide: row.mechanicalTiltDegDonorSide || '',
            donorRegulatoryPower: row.donorRegulatoryPower || '',
            repeaterManufacturer: row.repeaterManufacturer || '',
            repeaterModel: row.repeaterModel || '',
            repeaterNode: row.repeaterNode || '',
            miscTransmissionLossesDb: row.miscTransmissionLossesDb || '',
            miscReceptionLossesDb: row.miscReceptionLossesDb || '',
            radioPhysicalConnection: row.radioPhysicalConnection || '',
            antennaNotes: row.antennaNotes || '',
            radioQuantity: row.radioQuantity || '',
            radioNotes: row.radioNotes || '',
            blackBox: row.blackBox || '',
            cpriConnections: row.cpriConnections || '',
            antennaQuantity: row.antennaQuantity || '',
            antenna2OrderablePartName: row.antenna2OrderablePartName || '',
            antenna2Model: row.antenna2Model || '',
            antenna2MaxGainDbD: row.antenna2MaxGainDbD || '',
            antenna2Manufacturer: row.antenna2Manufacturer || '',
            antenna2PatternElectricalT: row.antenna2PatternElectricalT || '',
            antenna2HBwDeg: row.antenna2HBwDeg || '',
            antenna2HeightIn: row.antenna2HeightIn || '',
            antenna2WidthIn: row.antenna2WidthIn || '',
            antenna2DepthIn: row.antenna2DepthIn || '',
            antenna2Polarization: row.antenna2Polarization || '',
            antenna2WeightLbs: row.antenna2WeightLbs || '',
            antenna2AzimuthDeg: row.antenna2AzimuthDeg || '',
            antenna2PercentPower: row.antenna2PercentPower || '',
            antenna2MechanicalTilt: row.antenna2MechanicalTilt || '',
            antenna2AdditionalElectricalTiltDeg: row.antenna2AdditionalElectricalTiltDeg || '',
            antenna2MountPosition: row.antenna2MountPosition || '',
            antenna2MountFace: row.antenna2MountFace || '',
            antenna2TipHeight: row.antenna2TipHeight || '',
            antenna2CenterLine: row.antenna2CenterLine || '',
            antenna3OrderablePartName: row.antenna3OrderablePartName || '',
            antenna3Model: row.antenna3Model || '',
            antenna3MaxGainDbD: row.antenna3MaxGainDbD || '',
            antenna3Manufacturer: row.antenna3Manufacturer || '',
            antenna3PatternElectrical: row.antenna3PatternElectrical || '',
            antenna3HBwDeg: row.antenna3HBwDeg || '',
            antenna3HeightIn: row.antenna3HeightIn || '',
            antenna3WidthIn: row.antenna3WidthIn || '',
            antenna3DepthIn: row.antenna3DepthIn || '',
            antenna3Polarization: row.antenna3Polarization || '',
            antenna3WeightLbs: row.antenna3WeightLbs || '',
            antenna3AzimuthDeg: row.antenna3AzimuthDeg || '',
            antenna3PercentPower: row.antenna3PercentPower || '',
            antenna3MechanicalTiltDeg: row.antenna3MechanicalTiltDeg || '',
            antenna3Additional: row.antenna3Additional || '',
            antenna3MountPosition: row.antenna3MountPosition || '',
            antenna3MountFace: row.antenna3MountFace || '',
            aisgRet: row.aisgRet || '',
            aisgInternational: row.aisgInternational || '',
            aisgDaisyChain: row.aisgDaisyChain || '',
            radioDaisyBands: row.radioDaisyBands || '',
            hd: row.hd || '',
            he: row.he || '',
            hf: row.hf || '',
            hg: row.hg || '',
            hh: row.hh || '',
            hi: row.hi || '',
            hj: row.hj || ''
        }));
    };

    console.log("rows",rows)
    useEffect(() => {
        if (!spreadsheetRef.current) return;

        if (spreadsheetInstance.current) {
            try { (jspreadsheet as any).destroy(spreadsheetRef.current); } catch { /* noop */ }
            spreadsheetInstance.current = null;
        }

        const paginatedRows = getPaginatedData(rows as AtollDataRow[], currentPage, rowsPerPage);
        const data = convertRowsToArrays(paginatedRows);
        console.log("data",data)

        // Define columns as array of objects with name property
        const dynamicColumns = [
            { name: 'bandClass', type: 'number', title: 'Band Class', width: 120 },
            { name: 'carrier', type: 'dropdown', title: 'Carrier', width: 120, source: carrierOptions, readOnly: false },
            { name: 'sector', type: 'text', title: 'Sector', width: 100 },
            { name: 'enodebName', type: 'text', title: 'gNB/eNB Name', width: 150 },
            { name: 'siteName', type: 'text', title: 'Site Name', width: 140 },
            { name: 'fuzeSiteId', type: 'text', title: 'Fuze Site ID', width: 140 },
            { name: 'siteRecordId', type: 'text', title: 'Site Record ID', width: 150 },
            { name: 'siteNumber', type: 'text', title: 'Site Number', width: 140 },
            { name: 'siteVersion', type: 'text', title: 'Site Version', width: 130 },
            { name: 'supportHeight', type: 'text', title: 'Support Height (ft)', width: 160 },
            { name: 'transmitterName', type: 'text', title: 'Transmitter Name', width: 160 },
            { name: 'transmitterRecordId', type: 'text', title: 'Transmitter Record Id', width: 180 },
            { name: 'azimuthDeg', type: 'text', title: 'Azimuth (deg)', width: 140 },
            { name: 'antennaManufacturer', type: 'text', title: 'Antenna Manufacturer', width: 170 },
            { name: 'antennaModel', type: 'text', title: 'Antenna Model', width: 150 },
            { name: 'antennaOrderablePartName', type: 'text', title: 'Antenna Orderable Part Name', width: 220 },
            { name: 'antennaMaxGainDbD', type: 'text', title: 'Antenna Max Gain (dBd)', width: 170 },
            { name: 'antennaHBw', type: 'text', title: 'Antenna H-BW (deg)', width: 160 },
            { name: 'antennaHeight', type: 'text', title: 'Antenna Height (in)', width: 170 },
            { name: 'antennaWidth', type: 'text', title: 'Antenna Width (in)', width: 160 },
            { name: 'antennaDepth', type: 'text', title: 'Antenna Depth (in)', width: 160 },
            { name: 'antennaWeight', type: 'text', title: 'Antenna Weight (lbs)', width: 170 },
            { name: 'antennaCenterline', type: 'text', title: 'Antenna Centerline (ft)', width: 180 },
            { name: 'antennaTipHeight', type: 'text', title: 'Antenna Tip Height (ft)', width: 180 },
            { name: 'mechanicalTilt', type: 'text', title: 'Mechanical Tilt (deg)', width: 180 },
            { name: 'antennaPatternElectricalTilt', type: 'text', title: 'Antenna Pattern Electrical Tilt (deg)', width: 220 },
            { name: 'additionalElectricalTilt', type: 'text', title: 'Additional Electrical Tilt (deg)', width: 220 },
            { name: 'rrhManufacturer', type: 'text', title: 'RRH Manufacturer', width: 160 },
            { name: 'rrhModelName', type: 'text', title: 'RRH Model Name', width: 150 },
            { name: 'radioLocation', type: 'text', title: 'Radio Location', width: 150 },
            { name: 'tmaModel', type: 'text', title: 'TMA Model', width: 130 },
            { name: 'tmaManufacturer', type: 'text', title: 'TMA Manufacturer', width: 160 },
            { name: 'eNodeBId', type: 'text', title: 'eNodeB ID', width: 130 },
            { name: 'maxErp', type: 'text', title: 'Max ERP (W)', width: 130 },
            { name: 'maxErpAlt', type: 'text', title: 'Alternate Max ERP (W)', width: 170 },
            { name: 'totalErp', type: 'text', title: 'Total ERP (W)', width: 140 },
            { name: 'carrierBand', type: 'dropdown', title: 'Carrier', width: 120, source: carrierBandOptions, readOnly: false },
            { name: 'bandInfo', type: 'dropdown', title: 'Band Info', width: 130, source: bandInfoOptions, readOnly: false },
            { name: 'airInterface', type: 'text', title: 'Air Interface', width: 140 },
            { name: 'radioAccessTechnology', type: 'text', title: 'Radio Access Technology', width: 190 },
            { name: 'centerChannel', type: 'text', title: 'Center Channel', width: 150 },
            { name: 'channelBandwidth', type: 'text', title: 'Channel Bandwidth (MHz)', width: 180 },
            { name: 'cellId', type: 'text', title: 'Cell ID', width: 120 },
            { name: 'numberOfTxAntennaPo', type: 'text', title: 'Number of Tx Antenna Po', width: 190 },
            { name: 'numberOfRxAntennaPo', type: 'text', title: 'Number of Rx Antenna Po', width: 190 },
            { name: 'sharedAntenna', type: 'text', title: 'Shared Antenna', width: 150 },
            { name: 'mountPosition', type: 'text', title: 'Mount Position', width: 150 },
            { name: 'mountFace', type: 'text', title: 'Mount Face', width: 130 },
            { name: 'gnbEnbVendor', type: 'text', title: 'gNB/eNB Vendor', width: 150 },
            { name: 'cellDlTotalPower', type: 'text', title: 'Cell DL Total Power (dBm)', width: 190 },
            { name: 'configuredMaxTxPower', type: 'text', title: 'Configured Max Tx Power', width: 190 },
            { name: 'pMax', type: 'text', title: 'pMax (dBm)', width: 130 },
            { name: 'diMaxTxPower', type: 'text', title: 'DI Max Tx Power', width: 160 },
            { name: 'regulatoryPower', type: 'text', title: 'Regulatory Power', width: 160 },
            { name: 'regulatoryPowerLimit', type: 'text', title: 'Regulatory PowerLimit', width: 170 },
            { name: 'nonPsdRegulatoryPower', type: 'text', title: 'Non-PSD Regulatory Power', width: 200 },
            { name: 'regulatoryPowerUnitless', type: 'text', title: 'Regulatory Power (Unitless)', width: 190 },
            { name: 'nonPsdRegulatoryPowerUnitless', type: 'text', title: 'Non-PSD Regulatory Power (Unitless)', width: 240 },
            { name: 'alternateRegulatoryPower', type: 'text', title: 'Alternate Regulatory Power (W)', width: 210 },
            { name: 'gnbDuNumber', type: 'text', title: 'gNB DU Number', width: 150 },
            { name: 'gnbDuName', type: 'text', title: 'gNB DU Name', width: 150 },
            { name: 'isRepeater', type: 'checkbox', title: 'Is Repeater', width: 130, readOnly: false },
            { name: 'donorTxId', type: 'text', title: 'Donor TX Id', width: 140 },
            { name: 'donorSector', type: 'text', title: 'Donor Sector', width: 140 },
            { name: 'donorGnbEnb', type: 'text', title: 'Donor gNB/EnB', width: 150 },
            { name: 'donorAirInterface', type: 'text', title: 'Donor Air Interface', width: 170 },
            { name: 'donorEnodebId', type: 'text', title: 'Donor Enodeb Id', width: 150 },
            { name: 'donorFrequency', type: 'text', title: 'Donor Frequency', width: 160 },
            { name: 'donorBadInfo', type: 'text', title: 'Donor Bad Info', width: 150 },
            { name: 'donorBandClass', type: 'text', title: 'Donor Band Class', width: 160 },
            { name: 'donorCenterChannel', type: 'text', title: 'Donor Center Channel', width: 180 },
            { name: 'donorChannelBandwidth', type: 'text', title: 'Donor Channel Bandwidth', width: 190 },
            { name: 'antennaModelDonorSi', type: 'text', title: 'Antenna Model (Donor Si', width: 190 },
            { name: 'antennaTipHeightFtDonorS', type: 'text', title: 'Antenna Tip Height (ft) (Donor S', width: 230 },
            { name: 'azimuthDegDonorSide', type: 'text', title: 'Azimuth (deg) (Donor Side)', width: 200 },
            { name: 'mechanicalTiltDegDonorSide', type: 'text', title: 'Mechanical Tilt (deg) (Donor Side)', width: 230 },
            { name: 'donorRegulatoryPower', type: 'text', title: 'Donor Regulatory Power', width: 180 },
            { name: 'repeaterManufacturer', type: 'text', title: 'Repeater Manufacturer', width: 170 },
            { name: 'repeaterModel', type: 'text', title: 'Repeater Model', width: 150 },
            { name: 'repeaterNode', type: 'text', title: 'Repeater Node', width: 150 },
            { name: 'miscTransmissionLossesDb', type: 'text', title: 'Miscellaneous Transmission Losses(dB)', width: 240 },
            { name: 'miscReceptionLossesDb', type: 'text', title: 'Miscellaneous Reception Losses(dB)', width: 230 },
            { name: 'radioPhysicalConnection', type: 'text', title: 'Radio Physical Connection', width: 190 },
            { name: 'antennaNotes', type: 'text', title: 'Antenna Notes', width: 150 },
            { name: 'radioQuantity', type: 'text', title: 'Radio Quantity', width: 150 },
            { name: 'radioNotes', type: 'text', title: 'Radio Notes', width: 140 },
            { name: 'blackBox', type: 'text', title: 'Black Box', width: 130 },
            { name: 'cpriConnections', type: 'text', title: 'CPRI Connections', width: 160 },
            { name: 'antennaQuantity', type: 'text', title: 'Antenna Quantity', width: 160 },
            { name: 'antenna2OrderablePartName', type: 'text', title: 'Antenna2 Orderable Part Name', width: 220 },
            { name: 'antenna2Model', type: 'text', title: 'Antenna2 Model', width: 150 },
            { name: 'antenna2MaxGainDbD', type: 'text', title: 'Antenna2 Max Gain (dBD)', width: 180 },
            { name: 'antenna2Manufacturer', type: 'text', title: 'Antenna2 Manufacturer', width: 180 },
            { name: 'antenna2PatternElectricalT', type: 'text', title: 'Antenna2 Pattern Electrical T', width: 210 },
            { name: 'antenna2HBwDeg', type: 'text', title: 'Antenna2 H-BW (deg)', width: 160 },
            { name: 'antenna2HeightIn', type: 'text', title: 'Antenna2 Height (in)', width: 160 },
            { name: 'antenna2WidthIn', type: 'text', title: 'Antenna2 Width (in)', width: 160 },
            { name: 'antenna2DepthIn', type: 'text', title: 'Antenna2 Depth (in)', width: 160 },
            { name: 'antenna2Polarization', type: 'text', title: 'Antenna2 Polarization', width: 170 },
            { name: 'antenna2WeightLbs', type: 'text', title: 'Antenna2 Weight (lbs)', width: 170 },
            { name: 'antenna2AzimuthDeg', type: 'text', title: 'Antenna2 Azimuth (deg)', width: 170 },
            { name: 'antenna2PercentPower', type: 'text', title: 'Anetnna2 Percent Power', width: 180 },
            { name: 'antenna2MechanicalTilt', type: 'text', title: 'Antenna2 Mechanical Tilt', width: 180 },
            { name: 'antenna2Additional', type: 'text', title: 'Antenna2 Additional Electrical Tilt (deg)', width: 250 },
            { name: 'antenna2MountPosition', type: 'text', title: 'Antenna2 Mount Position', width: 180 },
            { name: 'antenna2MountFace', type: 'text', title: 'Antenna2 Mount Face', width: 170 },
            { name: 'antenna2TipHeight', type: 'text', title: 'Antenna2 Tip Height', width: 160 },
            { name: 'antenna2CenterLine', type: 'text', title: 'Antenna2 Center Line', width: 160 },
            { name: 'antenna3OrderablePartName', type: 'text', title: 'Antenna3 Orderable Part Name', width: 220 },
            { name: 'antenna3Model', type: 'text', title: 'Antenna3 Model', width: 150 },
            { name: 'antenna3MaxGainDbD', type: 'text', title: 'Antenna3 Max Gain (dBd)', width: 180 },
            { name: 'antenna3Manufacturer', type: 'text', title: 'Antenna3 Manufacturer', width: 180 },
            { name: 'antenna3PatternElectrical', type: 'text', title: 'Antenna3 Pattern Electrical', width: 200 },
            { name: 'antenna3HBwDeg', type: 'text', title: 'Antenna3 H-BW (deg)', width: 160 },
            { name: 'antenna3HeightIn', type: 'text', title: 'Antenna3 Height (in)', width: 160 },
            { name: 'antenna3WidthIn', type: 'text', title: 'Antenna3 Width (in)', width: 160 },
            { name: 'antenna3DepthIn', type: 'text', title: 'Antenna3 Depth (in)', width: 160 },
            { name: 'antenna3Polarization', type: 'text', title: 'Antenna3 Polarization', width: 170 },
            { name: 'antenna3WeightLbs', type: 'text', title: 'Antenna3 Weight (lbs)', width: 170 },
            { name: 'antenna3AzimuthDeg', type: 'text', title: 'Antenna3 Azimuth (deg)', width: 170 },
            { name: 'antenna3PercentPower', type: 'text', title: 'Antenna3 Percent Power', width: 170 },
            { name: 'antenna3MechanicalTiltDeg', type: 'text', title: 'Antenna3 Mechanical Tilt (deg)', width: 220 },
            { name: 'antenna3Additional', type: 'text', title: 'Antenna3 Additional', width: 160 },
            { name: 'antenna3MountPosition', type: 'text', title: 'Antenna3 Mount Position', width: 180 },
            { name: 'antenna3MountFace', type: 'text', title: 'Antenna3 Mount Face', width: 170 },
            { name: 'aisgRet', type: 'text', title: 'AISG Ret', width: 120 },
            { name: 'aisgInternational', type: 'text', title: 'AISG International', width: 170 },
            { name: 'aisgDaisyChain', type: 'text', title: 'AISG Daisy Chain', width: 170 },
            { name: 'radioDaisyBands', type: 'text', title: 'Radio Daisy Bands', width: 160 },
            { name: 'hd', type: 'text', title: 'HD', width: 100 },
            { name: 'he', type: 'text', title: 'HE', width: 100 },
            { name: 'hf', type: 'text', title: 'HF', width: 100 },
            { name: 'hg', type: 'text', title: 'HG', width: 100 },
            { name: 'hh', type: 'text', title: 'HH', width: 100 },
            { name: 'hi', type: 'text', title: 'HI', width: 100 },
            { name: 'hj', type: 'text', title: 'HJ', width: 100 }
        ];

        try {
            // Extract common allow* flags into a shared object and reused across tabs
            // Centralized using factory function/config builder
            const config = createSpreadsheetConfig({
                data,
                columns: dynamicColumns,
                tableHeight: '350px',
            });

            spreadsheetInstance.current = (jspreadsheet as any)(spreadsheetRef.current, config as any);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error initializing AtollDataTab spreadsheet', e);
        }

        return () => {
            if (spreadsheetInstance.current && spreadsheetRef.current) {
                try { (jspreadsheet as any).destroy(spreadsheetRef.current); } catch { /* noop */ }
            }
        };
    }, [rows, currentPage, rowsPerPage]);

    return (
        <Box className="data-editor-table">
            {loading ? (
                <Typography className="data-editor-loading">Loading data...</Typography>
            ) : (
                <div ref={spreadsheetRef} style={{ width: '100%' }} />
            )}
        </Box>
    );
}

export default AtollDataTab;
