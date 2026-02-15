import { Spreadsheet, Worksheet } from "@jspreadsheet/react";
import "jspreadsheet/dist/jspreadsheet.css";
import "jspreadsheet/dist/jspreadsheet.themes.css";
import "jsuites/dist/jsuites.css";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/app/redux/hooks";
import { jspreadsheetLicense } from "../../app/common/config/JspreadsheetLicense";
import { columns, hideColumnByHeader, initialData, ISpreadsheetSiteListData, updateSubBandDropdownInGrid } from "./GridInitialData";
import { handleOnChange, onBeforeDeleteRow, onDeleteRow, contextMenu, onSearchAction } from "./BulkSiteListGridAction";
import { createAddElementsForAllData, getCellsName, removeExistingIcon, resetGridStyle, resetTableRowCount, resetUpdatedDataAndGroup, setGridStyle } from "./BulkSiteListHelper";
import { setDefaultValueReceivedData } from "../common/BulkSiteList";


export const BulkSiteListGrid = (props: { loading: boolean, setLoading: (loading: boolean) => void, setAlert: () => void, spreadsheetSiteListRef: any, setSpreadsheetSiteListRef: (val: any) => void }) => {
    const { loading, setLoading, setAlert, spreadsheetSiteListRef, setSpreadsheetSiteListRef } = props;
    const dispatch = useAppDispatch();
    const spreadsheetSiteList = useRef();
    const solutionInitialSiteListData: any = useAppSelector((state: any) => state?.solutionSiteList?.solutionInitialSiteListData);
    const solutionInitialSiteListDataRef = useRef(solutionInitialSiteListData);
    const solutionUpdatedSiteListData: any = useAppSelector((state: any) => state?.solutionSiteList?.solutionUpdatedSiteListData);
    const isN5LStatus = useAppSelector((state: any) => state?.solutionSiteList?.isN5LStatus);
    const [columnList, setColumnList] = useState<any>(columns);
    const [tempInitialData, setTempInitialData] = useState<any>(initialData);

    useEffect(() => {
        if (spreadsheetSiteListRef) {
            hideColumnByHeader(spreadsheetSiteListRef, 'technologyType', isN5LStatus ? 'hide' : 'show');
            updateSubBandDropdownInGrid(spreadsheetSiteListRef, isN5LStatus ? 'N5L' : 'N7L');
        }
    }, [spreadsheetSiteListRef]);

    useEffect(() => {
        try {
            setLoading(true);
            if (spreadsheetSiteList?.current?.[0]) {
                setSpreadsheetSiteListRef(spreadsheetSiteList.current?.[0]);
            };

            if (solutionInitialSiteListDataRef.current !== solutionInitialSiteListData) {
                solutionInitialSiteListDataRef.current = solutionInitialSiteListData;
                resetGridStyle(spreadsheetSiteListRef);
                removeExistingIcon(spreadsheetSiteListRef);
                loadGridData(solutionInitialSiteListData);
            } else if (solutionUpdatedSiteListData.isLoadRequired) {
                let filterData: any = solutionUpdatedSiteListData?.updatedSiteList?.filter((item: any) => (item?.parentSolutionId !== null));
                spreadsheetSiteListRef?.loadData(structuredClone(filterData));
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(false)
            console.error("error", error);
        }
    }, [solutionInitialSiteListData, solutionUpdatedSiteListData]);

    useEffect(() => {
        let columnListTemp: any = structuredClone(columnList);
        let technologyTypeIndex = columnListTemp.findIndex((col: any) => col.name === "technologyType");
        if (technologyTypeIndex != -1) {
            if (isN5LStatus && columnListTemp[technologyTypeIndex].type !== 'hidden') {
                columnListTemp[technologyTypeIndex].type = 'hidden';
                columnListTemp[technologyTypeIndex].isExport = false;
            } else if (!isN5LStatus && columnListTemp[technologyTypeIndex].type !== 'dropdown') {
                columnListTemp[technologyTypeIndex].type = 'dropdown';
                columnListTemp[technologyTypeIndex].isExport = true;
            }
            setColumnList([...columnListTemp]);
            if (spreadsheetSiteListRef) {
                hideColumnByHeader(spreadsheetSiteListRef, 'technologyType', isN5LStatus ? 'hide' : 'show');
                updateSubBandDropdownInGrid(spreadsheetSiteListRef, isN5LStatus ? 'N5L' : 'N7L');
            }
        }
    }, [solutionInitialSiteListData, isN5LStatus]);

    const loadGridData = async (data: ISpreadsheetSiteListData[]) => {
        try {
            if (spreadsheetSiteListRef) {
                if (data?.length > 0) {
                    data = setDefaultValueReceivedData(spreadsheetSiteListRef, data);
                    if (data?.length > 0) {
                        resetTableRowCount(spreadsheetSiteListRef, data);
                        spreadsheetSiteListRef?.loadData(structuredClone(data));
                        let updatedData = resetUpdatedDataAndGroup(spreadsheetSiteListRef, dispatch);
                        createAddElementsForAllData(spreadsheetSiteListRef, dispatch, updatedData?.siteGroupData);

                        let styleOnUpdatedFields: string[] = [];
                        data?.forEach((each: any, index: number) => {
                            if (each?.['updatedFields']?.length > 0) {
                                each?.['updatedFields'].forEach((eachField: any) => {
                                    let cells = getCellsName(spreadsheetSiteListRef, eachField, index);
                                    if (cells) styleOnUpdatedFields.push(cells);
                                });
                            }
                        });
                        if (styleOnUpdatedFields?.length > 0 && spreadsheetSiteListRef) setGridStyle(spreadsheetSiteListRef, styleOnUpdatedFields);
                    }
                } else {
                    resetTableRowCount(spreadsheetSiteListRef, []);
                    setTimeout(() => {
                        spreadsheetSiteListRef?.loadData(structuredClone([]));
                    }, 100);
                }
            }
        }
        catch (err) {
            console.error("err", err);
        }
    }

    return (
        <div className="bulk-solutions-grid bulk-site-list-grid">

            <Spreadsheet
                ref={spreadsheetSiteList}
                license={jspreadsheetLicense}
                contextMenu={contextMenu}
                loadingSpin={true}
                validations={[]}
                tabs={false}
                allowDeleteRow={true}
                onchange={(instance: any, cell: any, x: any, y: any, value: any, oldValue: any) => {
                    handleOnChange(instance, x, y, value, oldValue, dispatch)
                }}

                // oninsertrow={handleInsertRow}

                ondeleterow={(instance: any, rowNumber: number[]) => {
                    onDeleteRow(instance, rowNumber, dispatch);
                }}

                onbeforedeleterow={(instance: any, rowNumber: number[]) => {
                    const result = onBeforeDeleteRow(instance, rowNumber, dispatch);
                    return result;
                }}

                onsearchrow={onSearchAction}

            >
                <Worksheet
                    id={'SolutionSiteListTable'}
                    freezeRows="0"
                    data={tempInitialData}
                    search={true}
                    fullscreen={false}
                    columns={columnList}
                    pagination="100"
                    filters
                    tableOverflow={true}
                    paginationOptions={[100, 200, 500]}
                    worksheetName={"SolutionSiteList"}
                    freezeColumns="3"
                    minDimensions={[columns.length, 0]}
                    minSpareRows={0}
                    onsearchrow={onSearchAction}
                />
            </Spreadsheet>
        </div >
    );
};


