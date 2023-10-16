'use client'
import { useCallback, useState, memo, useEffect } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { FaFilter } from 'react-icons/fa';
import { LuRefreshCcw } from 'react-icons/lu';
import { MdSearch } from 'react-icons/md';
import { TbFilterCancel } from 'react-icons/tb';
import { Dna, } from 'react-loader-spinner';
import { CustomButton, CustomInput, CustomLabel } from '..';
import { INITIAL_PAGE } from '@/utils/constants';

CustomDataTable.propTypes = {
    source: PropTypes.array.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            dataIndex: PropTypes.string,
            title: PropTypes.string,
            component: PropTypes.any, // Will render the component in the cell ONLY and NOT the value in column. Applicable to render a component without the column name
            width: PropTypes.any,
            render: PropTypes.any // Will both render the component in the column and the value in cell
        })
    ).isRequired,
    filter: PropTypes.any,
    filterClasses: PropTypes.any,
    searchRef: PropTypes.any,
    placeholderSearch: PropTypes.string,
    showCount: PropTypes.number,
    currentPage: PropTypes.number,
    lastPage: PropTypes.number,
    totalCount: PropTypes.number,
    action: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'stripe']),
    handleOnSearch: PropTypes.func,
    onHandlePreviousPage: PropTypes.func,
    onHandlePageChange: PropTypes.func,
    onHandleNextPage: PropTypes.func,
    onClickRow: PropTypes.any,
    loading: PropTypes.bool,
    onRefresh: PropTypes.func
};

function CustomDataTable(props) {
    const { variant = 'default' } = props;

    // Initialization
    const [openFilter, isOpenFilter] = useState(false);
    const [triggerRefresh, setTrigger] = useState(false);
    const [loading, setLoading] = useState(props.loading);
    
    // Functions
    useEffect(() => {
        setLoading(props.loading)
    },[props.loading]);
    
    const triggerFilter = useCallback((visibility) => {
        isOpenFilter(prevState => !prevState);
    },[]);

    const onHandleInputChange = useCallback((e) => {
        const { value } = e.target;
        const pageNumber = parseInt(value);
        if (!isNaN(pageNumber) && pageNumber) {
            props.onHandlePageChange(pageNumber);
        } else {
            props.onHandlePageChange(1);
        }
    },[props.onHandlePageChange])

    const handlePageChange = useCallback((page) => {
        props.onHandlePageChange(page);
    },[props.onHandlePageChange]);

    const handleRefresh = useCallback(() => {
        setTrigger(true)
        setLoading(true)
        typeof props.onRefresh !== 'undefined' && props.onRefresh()
        const interval = setInterval(() => {
            setTrigger(false)
            setLoading(false)
        },1000);

        return () => clearInterval(interval)
    },[]);

    // Rendered Components
    const renderPages = () => {
        
        const paginationNumbers = [];
        const ellipsis = <CustomButton text='...' addedClass='px-3 py-2 leading-tight table-page-inactive bg-gray-100 hover:cursor-not-allowed' />

        // Add first page
        paginationNumbers.push(
            <CustomButton 
                key={`firstpage-${1}`}
                addedClass={clsx('block px-3 py-2 leading-tight', props.currentPage === 1 ? 'table-page-active' : 'table-page-inactive')}
                text={1}
                onClick={() => handlePageChange(1)}
            />
        );

        let startPage = props.currentPage - 2;
        let endPage = props.currentPage + 2;

        if (startPage <= 1) {
            startPage = 2;
            endPage = Math.min(6, props.lastPage); // Show up to 6 pages
            if (endPage === 6) {
                endPage--; // Adjust to account for ellipsis
            }
        } else if (endPage >= props.lastPage - 1) {
            startPage = Math.max(2, props.lastPage - 5); // Show up to 6 pages
            endPage = props.lastPage - 1;
            if (startPage === 2) {
                startPage++; // Adjust to account for ellipsis
            }
        }

        if (startPage > 2) {
            paginationNumbers.push(ellipsis);
        }

        // Add page numbers in between
        for (let i = startPage; i <= endPage; i++) {
            paginationNumbers.push(
                <CustomButton 
                    key={`page-${i}`}
                    addedClass={clsx('block px-3 py-2 leading-tight', props.currentPage === i ? 'table-page-active' : 'table-page-inactive')}
                    onClick={() => handlePageChange(i)}
                    text={i}
                />
            );
        }

        if (endPage < props.lastPage - 1) {
            paginationNumbers.push(ellipsis);
        }

        if (props.lastPage > 4) {
            // Add last page
            paginationNumbers.push(
                <CustomButton 
                    key={`lastpage-${props.lastPage}`}
                    addedClass={clsx('block px-3 py-2 leading-tight', props.currentPage === props.lastPage ? 'table-page-active' : 'table-page-inactive')}
                    onClick={() => handlePageChange(props.lastPage)}
                    text={props.lastPage}
                />
                ,
            );
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="inline-flex items-center -space-x-px">
                    {/* Render the Previous button */}
                    <CustomButton 
                        addedClass={clsx('table-previous-button',
                            props.currentPage === 1 && 'text-gray-300 hover:cursor-not-allowed'
                        )}
                        onClick={() => props.onHandlePreviousPage()}
                        disabled={props.currentPage === 1}
                        text='Previous'
                    />

                    {/* Render the pagination numbers */}
                    {paginationNumbers}

                    {/* Render the Next button */}
                    <CustomButton 
                        addedClass={clsx('table-next-button', props.currentPage === props.lastPage && 'text-gray-300 hover:cursor-not-allowed')}
                        onClick={() => props.onHandleNextPage()}
                        disabled={props.currentPage === props.lastPage}
                        text='Next'
                    />
                </ul>
            </nav>
        );
    };

    const renderColumns = () => (
        props.columns.map((column, idx) => (
            <th key={idx} className={`table-header w-[${column.width}]`}>
                {
                    column.component ? column.component(props.source) : column.title
                }
            </th>
        ))
    )

    const renderTableBody = () => (
       props.source?.length > 0
       ?  props.source?.map((dataRow, rowIndex) => (
                <tr 
                    key={rowIndex} 
                    className={clsx('cursor-pointer hover:bg-gray-300/50', 
                        variant === 'stripe' 
                            ? rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100' 
                            : rowIndex % 1 === 0 ? 'border-b border-gray-200' : 'border-none'
                    )}
                >
                    {
                        props.columns?.map((column, columnIndex) => (
                            <td 
                                onClick={() => columnIndex !== props.columns.length - 1 && Object.prototype.hasOwnProperty.call(column, 'dataIndex') ? props.onClickRow(dataRow) : null} 
                                key={columnIndex} 
                                className={clsx(`p-5 col-${columnIndex}`, columnIndex % 2 === 0 ? ' border-b-red-600' : 'border-b-gray-300')}
                            >
                                {
                                    column.render 
                                    ? column.render(dataRow[column?.dataIndex] ?? dataRow) 
                                    : column.component 
                                        ? column.component( dataRow[column?.dataIndex] ?? dataRow) 
                                        : dataRow[column?.dataIndex]
                                }
                            </td>
                        ))
                    }
                </tr>
            ))
        :   <tr className="p-10 w-full ">
                <td className="w-full p-5" colSpan="10">
                    <div className='w-full flex items-center justify-center flex-col'>
                        <Image src='/images/empty.png' width={200} height={200} alt='No Records' />
                        <CustomLabel children='No Records Found' variant='h6' addedClass='font-semibold text-xl mt-2' />
                        <CustomLabel children='Click Add to create one.' variant='subtitle' />
                    </div>
                </td>
            </tr>
    )

    const loader = () => (
        <tr className="p-10 w-full ">
            <td className="w-full p-5" colSpan="10">
                <div className='w-full flex items-center justify-center flex-col'>
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                />
                <CustomLabel children='Fetching Data...' variant='h6' addedClass='text-base' />
                </div>
            </td>
        </tr>
    )

    return (
        <div>
            {/* FILTERING */}
            <div className='table-filter-container'>
                <CustomButton 
                    addedClass={clsx('rounded-full p-2', triggerRefresh && 'animate-forwardSpin')}
                    onClick={handleRefresh}
                    icon={<LuRefreshCcw size={20} />}
                    title='Refresh'
                />
                {/* SEARCH BAR */}
                <div className="flex flex-grow w-full gap-2 items-centeri">
                    <CustomInput 
                        id='txtSearch'
                        prefixicon={ <MdSearch size={20}  className="text-gray-400" /> }
                        name='search'
                        type='text'
                        ref={props.searchRef}
                        placeholder={props.placeholderSearch}
                        onChange={props.handleOnSearch}
                        addedclass="bg-primary-gray-50 w-full"
                        size='small'
                    />

                     {/* FILTER */}
                    <div className="relative">
                        <CustomButton
                            text='Filter'
                            icon={<FaFilter size={15} color='gray' />}
                            onClick={() => triggerFilter(true)}
                            variant='transparent'
                        />
                        
                        {/* FILTER CONTENT */}
                        <div className='absolute w-full flex items-center justify-center mt-[4.5rem]'>
                            <motion.div
                                initial={{ y: '-10px', opacity: 0}}
                                animate={{ y: openFilter ? 1 : '-10px', opacity: openFilter ? 1 : 0,  transition: { type: 'spring', ease: 'easeInOut', bounce: .5 } }}
                                exit={{ y: '-10px', opacity: 0, transition: { type:'spring', ease: 'easeInOut' , bounce: 0.5 } }}
                                className={clsx('dropdown-default mt-3 items-center justify-center', openFilter ? '' : 'hidden', props.filterClasses)}
                            >
                                {
                                    <div className=''>
                                        <div className='p-3 border-b border-gray-300 w-full text-center'>
                                            <CustomLabel children='Filters' variant='subtitle' addedClass='font-semibold' />
                                        </div>
                                        <div className='p-5'>
                                        {
                                            props.filter ?? 
                                            <div className='flex flex-col space-y-2 items-center justify-center text-center'>
                                                <TbFilterCancel size={30} color='gray' />
                                                <CustomLabel children='No Filter Content' addedClass='text-center' variant='subtitle' />
                                            </div>
                                        }
                                        </div>
                                    </div> 
                                    ?? <CustomLabel children='No Filter Content' addedClass='text-center' variant='subtitle' />
                                }
                            </motion.div>
                        </div>
                       
                    </div>
                </div>      

                {/* PAGES FILTER */}
                <div className='table-pages-filter-container'>
                    <div className='flex flex-1 flex-row justify-end items-center w-full gap-2'>
                        <CustomLabel variant="default" children="Showing" addedclass='text-primary-gray-500 text-sm md:text-base' />

                        {/* COUNT */}
                        <div className='flex flex-row items-center gap-2'>
                            <CustomLabel variant="default" children={props.showCount ?? 0} addedclass='font-semibold text-sm md:text-base' />
                            <span className="text-primary-gray-400 text-2xl">|</span>
                            <CustomLabel variant="default" children={props.currentPage ?? 0} addedclass='font-semibold text-sm md:text-base' />
                        </div>
                        <CustomLabel variant="default" children="of" addedclass='text-primary-gray-500 text-sm md:text-base' />
                        <CustomLabel variant="default" children={props.lastPage} addedclass='font-semibold text-sm md:text-base' />
                    </div>

                    {/* NEXT/PREVIOUS */}
                    <div className='flex flex-shrink flex-row justify-end items-center gap-1'>
                        <CustomButton 
                            icon={<BiChevronLeft size={20} color='gray' />}
                            addedclass='py-2'
                            onClick={props.onHandlePrevious}
                            disabled={props.currentPage === INITIAL_PAGE}
                        />

                        <div className="w-24 md:w-full">
                            <CustomInput
                                id='searchPage'
                                size='small'
                                type="number"
                                minLength={1}
                                maxLength={props.totalCount}
                                onChange={onHandleInputChange}
                                onBlur={(e) => {}}
                                addedclass='w-full'
                            />
                        </div>

                        {/* NEXT BUTTON */}
                        <CustomButton
                            icon={<BiChevronRight size={20} color='gray' />}
                            addedclass='py-2'
                            onClick={props.onHandleNextPage}
                            disabled={props.lastPage === props.currentPage}
                        />
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div id='dataTable' className='relative overflow-x-auto shadow-md sm:rounded-lg w-full -z-[1px]'>
                <div className='overflow-y-auto max-h-[800px]'>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 z-[99999]">
                        <thead className='w-full text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 p-5 sticky top-0'>
                            <tr>
                                {
                                  renderColumns()
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading  
                                ? loader()
                                : renderTableBody()
                            }
                        </tbody>
                    </table>
                </div>
            </div>

             {/* PAGINATION */}
             <nav className="flex items-center justify-center px-5 py-3" aria-label="Table navigation">
                <ul className="inline-flex items-center -space-x-px">{props.currentPage <= props.lastPage ? renderPages() : ''}</ul>
            </nav>
        </div>
    );
}

export default memo(CustomDataTable);