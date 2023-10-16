// import dynamic from 'next/dynamic';
import CustomAccordion from './accordion/CustomAccordion';
import CustomAvatar from './avatar/CustomAvatar';
import CustomButton from './button/CustomButton';
import CustomCard from './card/CustomCard';
import CustomAuthContainer from './container/CustomAuthContainer';
import CustomDropdown from './dropdown/CustomDropdown';
import CustomForm from './form/CustomForm';
import CustomHeader from './header/CustomHeader';
import CustomInput from './input/CustomInput';
import CustomPhoneInput from './input/CustomPhoneInput';
import CustomTextArea from './input/CustomTextArea';
import CustomLabel from './label/CustomLabel';
import CustomLazyList from './list/CustomLazyList';
import CustomListItem from './list/CustomListItem';
import CustomModal from './modal/CustomModal';
import CustomOptionSelector from './option-selector/CustomOptionSelector';
import MultipleLink from './reusable/multiplelink/MultipleLink';
import CustomSelect from './select/CustomSelect';
import CustomSettingsWidget from './settings/CustomSettingsWidget';
import CustomShowMore from './show-more/CustomShowMore';
import CustomSidebar from './sidebar/CustomSidebar';
import CustomSkeleton from './skeleton/CustomSkeleton';
import CustomSpinner from './spinner/CustomSpinner';
import CustomSwitch from './switch/CustomSwitch';
import CustomDataTable from './table/CustomDataTable';
import CustomTabs from './tabs/CustomTabs';
import CustomTag from './tag/CustomTag';
import CustomTemplate from './template/CustomTemplate';
import CustomUploader from './uploader/CustomUploader';

// const CustomAccordion = dynamic(() => import('./accordion/CustomAccordion'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomAvatar = dynamic(() => import('./avatar/CustomAvatar'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomButton = dynamic(() => import('./button/CustomButton'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomCard = dynamic(() => import('./card/CustomCard'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomDropdown = dynamic(() => import('./dropdown/CustomDropdown'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomHeader = dynamic(() => import('./header/CustomHeader'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomInput = dynamic(() => import('./input/CustomInput'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomTextArea = dynamic(() => import('./input/CustomTextArea'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomLabel = dynamic(() => import('./label/CustomLabel'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomListItem = dynamic(() => import('./list/CustomListItem'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomModal = dynamic(() => import('./modal/CustomModal'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomOptionSelector = dynamic(() => import('./option-selector/CustomOptionSelector'), { ssr: false, loading: () => <CustomSkeleton /> });
// const QueryProvider = dynamic(() => import('./query-provider/QueryProvider'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomDataTable = dynamic(() => import('./table/CustomDataTable'), { ssr: false, loading: () => <CustomSkeleton /> });
// const MultipleLink = dynamic(() => import('./reusable/multiplelink/MultipleLink'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomSidebar = dynamic(() => import('./sidebar/CustomSidebar'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomSpinner = dynamic(() => import('./spinner/CustomSpinner'), { ssr: true, loading: () => <CustomSkeleton /> });
// const CustomSwitch = dynamic(() => import('./switch/CustomSwitch'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomTabs = dynamic(() => import('./tabs/CustomTabs'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomTemplate = dynamic(() => import('./template/CustomTemplate'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomAuthContainer = dynamic(() => import('./container/CustomAuthContainer'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomForm = dynamic(() => import('./form/CustomForm'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomSelect = dynamic(() => import('./select/CustomSelect'), { ssr: false, loading: () => <CustomSkeleton /> });
// const CustomTag = dynamic(() => import('./tag/CustomTag'), { ssr: false, loading: () => <CustomSkeleton /> });

export {
    CustomAccordion,
    CustomAuthContainer,
    CustomAvatar,
    CustomButton,
    CustomCard,
    CustomDataTable,
    CustomDropdown,
    CustomForm,
    CustomHeader,
    CustomInput,
    CustomLabel,
    CustomLazyList,
    CustomListItem,
    CustomModal,
    CustomOptionSelector,
    CustomPhoneInput,
    CustomSelect,
    CustomSettingsWidget,
    CustomShowMore,
    CustomSidebar,
    CustomSkeleton,
    CustomSpinner,
    CustomSwitch,
    CustomTabs,
    CustomTag,
    CustomTemplate,
    CustomTextArea,
    CustomUploader,
    MultipleLink,
};
