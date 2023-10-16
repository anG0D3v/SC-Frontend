import Adapter from '@cfaester/enzyme-adapter-react-18';
import { describe, it, jest, beforeEach } from '@jest/globals';
import Enzyme from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { capitalizeFirstLetter, checkLanguage, decryptText, getTenantNameInUrl, initialPlaceholder, removeHtmlTags, truncateText, truncateValue, unixTimestampToDateTime } from '../utils/utils';
import CryptoJS from 'crypto-js';
import moment from 'moment';

Enzyme.configure({ adapter: new Adapter() });

const loginMutation = () =>
    useMutation({
        mutationFn: (data) => {
            return axios
                .post('https://dummyjson.com/auth/login', data)
                .then((res) => res.data);
        },
    });

const openMock = jest.fn();
global.open = openMock;

// Component
// describe('Test CustomButton component', () => {
//     it('Should render a custom button without crashing', () => {
//         const onClick = jest.fn();
//         const { getByRole } = render(
//             <CustomButton text="Click Me!" onClick={onClick} />,
//         );
//         const button = getByRole('button');
//         expect(button.textContent).toBe('Click Me!');
//     });
//     it('Should fire an even when button is clicked', () => {
//         const onClick = jest.fn();
//         const { getByRole } = render(
//             <CustomButton text="Click Me!" onClick={onClick} />,
//         );
//         const button = getByRole('button');
//         fireEvent.click(button);
//         expect(onClick).toHaveBeenCalledTimes(1);
//     });
//     it('Should render a default class for default variant', () => {
//         const wrapper = mount(
//             <CustomButton text="Click Me!" variant="default" />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn')).toBe(true);
//     });
//     it('Should render a danger solid button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="default"
//                 buttontype="error"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-solid-error')).toBe(true);
//     });
//     it('Should render a success solid button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="default"
//                 buttontype="success"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-solid-success')).toBe(true);
//     });
//     it('Should render a warning solid button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="default"
//                 buttontype="warning"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-solid-warning')).toBe(true);
//     });
//     it('Should render an outline default button', () => {
//         const wrapper = mount(
//             <CustomButton text="Click Me!" variant="outline" />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-outline')).toBe(true);
//     });
//     it('Should render an outline danger button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="outline"
//                 buttontype="error"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-outline-error')).toBe(true);
//     });
//     it('Should render an outline success button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="outline"
//                 buttontype="success"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-outline-success')).toBe(true);
//     });
//     it('Should render an outline success button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="outline"
//                 buttontype="success"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-outline-success')).toBe(true);
//     });
//     it('Should render an outline warning button', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="outline"
//                 buttontype="warning"
//             />,
//         );
//         const button = wrapper.find('button');
//         expect(button.hasClass('btn-outline-warning')).toBe(true);
//     });

//     it('Should render a button with an icon', () => {
//         const wrapper = mount(
//             <CustomButton
//                 text="Click Me!"
//                 variant="default"
//                 icon={<BsFacebook />}
//             />,
//         );
//         const icon = wrapper.find('BsFacebook');
//         expect(icon.exists()).toBe(true);
//     });

//     it('Should render a button with a loader', () => {
//         const wrapper = mount(
//             <CustomButton text="Click Me!" variant="default" isLoading />,
//         );
//         const loader = wrapper.find('CustomSpinner');
//         const button = wrapper.find('button');
//         expect(button.props().disabled).toBe(true);
//         expect(loader.exists()).toBe(true);
//     });

//     it('Should render an icon only', () => {
//         const wrapper = mount(
//             <CustomButton variant="default" icon={<BsFacebook />} />,
//         );
//         const text = wrapper.find('span');
//         expect(text.exists()).not.toBe(true);
//     });
// });

// describe('Test CustomInput component', () => {
//     it('Should render correctly', () => {
//         const wrapper = mount(
//             <CustomInput
//                 label="Username"
//                 placeholder="John Doe"
//                 name="username"
//                 type="text"
//             />,
//         );
//         const input = wrapper.find('input');
//         expect(input.hasClass('textbox-default')).toBe(true);
//         expect(input.props().placeholder).toEqual('John Doe');
//         expect(input.props().name).toEqual('username');
//     });
//     it('Should show error message for validation', () => {
//         const wrapper = mount(
//             <CustomInput
//                 name="username"
//                 label="Username"
//                 placeholder="John Doe"
//                 error="Username is a required field"
//             />,
//         );
//         const errorLabel = wrapper.find('h6');
//         expect(errorLabel.exists()).toBe(true);
//     });
//     it('Should fire onChange function', () => {
//         const onChange = jest.fn();
//         const wrapper = mount(
//             <CustomInput
//                 onChange={onChange}
//                 name="username"
//                 label="Username"
//                 placeholder="John Doe"
//             />,
//         );
//         const input = wrapper.find('input');
//         act(() => {
//             input.props().onChange({
//                 target: {
//                     value: 'jd@22',
//                 },
//             });
//         });
//         wrapper.update();
//         expect(onChange).toBeCalledTimes(1);
//     });

//     it('Should should show correct icon', () => {
//         const wrapper = mount(
//             <CustomInput
//                 type="password"
//                 placeholder="Enter password"
//                 label="Password"
//                 name="password"
//             />,
//         );
//         expect(wrapper.find('BsFillEyeSlashFill')).toHaveLength(1);
//         expect(wrapper.find('input').prop('type')).toEqual('password');
//         wrapper.find('button').simulate('click');
//         expect(wrapper.find('input').prop('type')).toEqual('text');
//         expect(wrapper.find('BsFillEyeFill')).toHaveLength(1);
//     });

//     it('Should accept string based on max length', () => {
//         const onChange = jest.fn();
//         const { getByRole } = render(
//             <CustomInput
//                 onChange={onChange}
//                 maxLength={5}
//                 type="text"
//                 label="Username"
//                 name="username"
//             />,
//         );
//         const input = getByRole('textbox');

//         fireEvent.change(input, { target: { value: '12345' } });
//         expect(input.value.length).toBe(5);
//         expect(input.value).toEqual('12345');
//         expect(onChange).toHaveBeenCalledTimes(1);
//     });
// });

// describe('Test CustomOption Selector component', () => {
//     it('Should render correctly', () => {
//         const wrapper = mount(<CustomOptionSelector label="Remember" />);
//         const cmp = wrapper.find('input');

//         //    Set as initial type
//         expect(cmp.prop('type')).toEqual('checkbox');
//         expect(wrapper.find('label').text()).toEqual('Remember');
//     });
//     it('Should render with link', async () => {
//         const wrapper = shallow(
//             <CustomOptionSelector
//                 hasLink
//                 sourceLink="https://www.google.com"
//                 linkName="Google"
//             />,
//         );
//         const link = wrapper.find('a');
//         expect(link.prop('href')).toEqual('https://www.google.com');
//     });
//     it('Should show a helper text', async () => {
//         const wrapper = mount(
//             <CustomOptionSelector
//                 label="Test Label"
//                 helperText="Sample helper text"
//             />,
//         );
//         const helperText = wrapper.find('p');
//         expect(helperText.text()).toEqual('Sample helper text');
//     });
//     it('Should disabled when disabled', async () => {
//         const wrapper = mount(
//             <CustomOptionSelector
//                 label="Test Label"
//                 helperText="Sample helper text"
//                 disabled
//             />,
//         );
//         const selector = wrapper.find('input');
//         expect(selector.props().disabled).toEqual(true);
//     });
//     it('Should render depend on type', async () => {
//         const wrapper = mount(
//             <CustomOptionSelector
//                 type="radio"
//                 label="Test Label"
//                 helperText="Sample helper text"
//             />,
//         );
//         const selector = wrapper.find('input');
//         expect(selector.props().type).toEqual('radio');
//     });
//     it("Should show error when there's an error", async () => {
//         const wrapper = mount(
//             <CustomOptionSelector
//                 errorMsg="This is required"
//                 type="radio"
//                 label="Test Label"
//                 helperText="Sample helper text"
//             />,
//         );
//         const label = wrapper.find('label');
//         const helperText = wrapper.find('p');
//         expect(label.hasClass('error-label')).toBe(true);
//         expect(helperText.hasClass('error-label')).toBe(true);
//     });
// });

// describe('Test CustomTextArea component', () => {
//     it('Should render correctly', () => {
//         const wrapper = mount(
//             <CustomTextArea
//                 label="Description"
//                 placeholder="Description here..."
//             />,
//         );
//         const textArea = wrapper.find('textarea');
//         expect(textArea.exists()).toBe(true);
//         expect(textArea.hasClass('text-area-default'));
//     });
//     it("Should show error when there's an error", () => {
//         const wrapper = mount(
//             <CustomTextArea
//                 errorMsg="This field is required."
//                 label="Description"
//                 placeholder="Description here..."
//             />,
//         );
//         const error = wrapper.find('h6');
//         expect(error.exists()).toBe(true);
//         expect(error.hasClass('error-label')).toBe(true);
//     });
//     it('Should call onChange function with correct value', () => {
//         const onChangeMock = jest.fn();
//         const { getByRole } = render(
//             <CustomTextArea
//                 label="Description"
//                 placeholder="Description here..."
//                 onChange={onChangeMock}
//             />,
//         );
//         const textarea = getByRole('textbox');
//         fireEvent.change(textarea, { target: { value: 'Sample description' } });
//         expect(textarea.value).toEqual('Sample description');
//         expect(onChangeMock).toBeCalledTimes(1);
//     });
// });

// describe('Modal', () => {
//   test('renders modal component with correct props', () => {
//     const onCloseMock = jest.fn();
//     const onClickMock = jest.fn();

//     render(
//       <Modal
//         modalid="modal1"
//         modalHeader="Test Modal"
//         isModalOpen={true}
//         onClose={onCloseMock}
//         onClick={onClickMock}
//         variant="default"
//         btnProceed="Proceed"
//         btnCancel="Cancel"
//       >
//         <div>Modal content</div>
//       </Modal>
//     );

//     const closeButton = screen.getByTestId('svg-icon');
//     fireEvent.click(closeButton);
//     expect(onCloseMock).toHaveBeenCalled();

//     const proceedButton = screen.getByText('Proceed');
//     fireEvent.click(proceedButton);
//     expect(onClickMock).toHaveBeenCalled();

//     const cancelButton = screen.getByText('Cancel');
//     fireEvent.click(cancelButton);
//     expect(onCloseMock).toHaveBeenCalledTimes(2);

//     const modalContent = screen.getByText('Modal content');
//     expect(modalContent).toBeInTheDocument();
//   });
// });

// Page
// describe('Test Login', () => {
//     let wrapper;
//     beforeEach(() => {
//         wrapper = mount(<Login />);
//     });

//     afterEach(() => {
//         wrapper.unmount();
//     });
//     it('Should render login page without crashing', () => {
//         const loginTitle = wrapper.find('h1');
//         expect(loginTitle.text()).toEqual('Login Page');
//         expect(loginTitle.hasClass('text-4xl font-bold text-cyan-600')).toBe(
//             true,
//         );
//     });

//     it('Should have link to go back to home page', () => {
//         const link = wrapper.find(Link);
//         expect(link.text()).toEqual('Go Back');
//         expect(link.prop('href')).toContain('/');
//     });

//     it('Should be validate required fields', async () => {
//         render(<Login />);
//         const usernameInput = screen.queryByTestId('username-input');
//         const passwordInput = screen.queryByTestId('password-input');
//         const loginButton = screen.getByRole('button', { name: /login/i });

//         act(() => {
//             fireEvent.change(usernameInput, { target: { value: '' } });
//             fireEvent.change(passwordInput, { target: { value: '' } });
//         });
//         fireEvent.click(loginButton);
//         const usernameInputerror = await screen.findByText(
//             /username is a required field/i,
//         );
//         const passwordInputerror = await screen.findByText(
//             /password is a required field/i,
//         );
//         expect(usernameInputerror).toBeInTheDocument();
//         expect(passwordInputerror).toBeInTheDocument();
//     });

//     it('Should render a form with required fields', () => {
//         expect(wrapper.find('form')).toHaveLength(1);
//         expect(wrapper.find('input[name="username"]')).toHaveLength(1);
//         expect(wrapper.find('input[name="password"]')).toHaveLength(1);
//         expect(wrapper.find('button[type="submit"]')).toHaveLength(1);
//     });

//     it('Should simulate fields correctly', async () => {
//         const usernameInput = wrapper.find('input').at(0);
//         const passwordInput = wrapper.find('input').at(1);

//         act(() => {
//             usernameInput.prop('onChange')({
//                 preventDefault: jest.fn(),
//                 target: {
//                     name: 'username',
//                     value: 'testuser',
//                 },
//             });
//             passwordInput.prop('onChange')({
//                 preventDefault: jest.fn(),
//                 target: {
//                     name: 'password',
//                     value: 'testpassword',
//                 },
//             });
//         });
//         wrapper.update();
//         expect(wrapper.find('input').at(0).props().value).toEqual('testuser');
//         expect(wrapper.find('input').at(1).props().value).toEqual(
//             'testpassword',
//         );
//     });

//     it('Should submit the form successfully', async () => {
//         const queryClient = new QueryClient();
//         const wrp = ({ children }) => (
//             <QueryClientProvider client={queryClient}>
//                 {children}
//             </QueryClientProvider>
//         );
//         const { result } = renderHook(() => loginMutation(), {
//             wrapper: wrp,
//         });
//         const form = wrapper.find('form');
//         const usernameInput = wrapper.find('input').at(0);
//         const passwordInput = wrapper.find('input').at(1);

//         act(() => {
//             usernameInput.prop('onChange')({
//                 preventDefault: jest.fn(),
//                 target: {
//                     name: 'username',
//                     value: 'kminchelle',
//                 },
//             });
//             passwordInput.prop('onChange')({
//                 preventDefault: jest.fn(),
//                 target: {
//                     name: 'password',
//                     value: '0lelplR',
//                 },
//             });
//         });
//         wrapper.update();
//         await act(async () => {
//             form.simulate('submit');
//             await result.current.mutate({
//                 username: wrapper.find('input').at(0).props().value,
//                 password: wrapper.find('input').at(1).props().value,
//             });
//         });
//         await waitFor(() => {
//             expect(result.current.isSuccess).toBe(true);
//         });
//     });

//     it('Should test login with the useMutation', async () => {
//         const queryClient = new QueryClient();
//         const wrp = ({ children }) => (
//             <QueryClientProvider client={queryClient}>
//                 {children}
//             </QueryClientProvider>
//         );
//         const { result } = renderHook(() => loginMutation(), {
//             wrapper: wrp,
//         });
//         await act(async () => {
//             await result.current.mutate({
//                 username: 'kminchelle',
//                 password: '0lelplR',
//             });
//         });
//         await waitFor(() => {
//             expect(result.current.isSuccess).toBe(true);
//         });
//     });
// });


// Function
describe('Test initial placeholder function for avatar ', () => {
    it('Should render two characters from the user\'s firstname and lastname initials', () => {
        expect(initialPlaceholder('John Doe')).toBe('JD');
    })
})

describe('Test getTenantNameInUrl function', () => {
    it('Should get the name after http:// or https://', () => {
        expect(getTenantNameInUrl('https://rmhcsc.supportcommunity.com')).toBe('rmhcsc');
    })
})

describe('Test text decryption', () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV }; 
    });
    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    it('Decrypt text from encrypted cryptojs', () => {
        process.env.CRYPTOJS_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        const encryptedText = CryptoJS.AES.encrypt('admin@supportcommunity.com', 'Sc4DaW!N').toString();
        const decryptedText = decryptText(encryptedText);
        expect(decryptedText).toEqual('admin@supportcommunity.com');
    })
})

describe('Test character capitalization', () => {
    it('Should capitalized first letter in a string', () => {
        expect(capitalizeFirstLetter('admin')).toEqual('Admin');
    })
})

describe('Test truncate text', () => {
    it('Should truncate long text', () => {
        const str = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.';
        const maxLength = 10;
        expect(truncateText(str, maxLength).endsWith('...')).toBe(true);
    })
})


// describe('Test Login Api', () => {
//     it('Should login with valid credentials', async() => {
//         const credentials = {
//             email: "admin@supportcommunity.com",
//             password: "SupportCommunity!21"
//         }
//         const headers = {
//             "X-Tenant": 'rmhcsc'
//         };
//         const response = await axios.post('http://localhost:8000/api/auth/login', credentials, {headers});
//         console.log('response: ', response);
//         // expect(response).not.toBe(null);
//         // expect(response.status).toBe(200);
//     });
// })

describe('Test removeHtmlTags', () => {
    it('should remove HTML tags from a string', () => {
        const inputString = '<p>This is <strong>an</strong> example.</p>';
        const expectedOutput = 'This is an example.';
        const result = removeHtmlTags(inputString);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const inputString = '';
        const expectedOutput = '';
        const result = removeHtmlTags(inputString);
        expect(result).toEqual(expectedOutput);
    });

    it('should handle input with no HTML tags', () => {
        const inputString = 'This is a plain text.';
        const expectedOutput = 'This is a plain text.';
        const result = removeHtmlTags(inputString);
        expect(result).toEqual(expectedOutput);
    });
});


describe('Test truncateValue', () => {
    it('should truncate text to the specified number of lines and characters', () => {
        const inputText = "Line 1: This is a long line that should be truncated.\nLine 2: This is another line.\nLine 3: This is the last line.";
        const expectedOutput = "Line 1: This is a long line that should be truncated.\nLine 2: This is another line.\nLine 3: This is ...";
        const result = truncateValue(inputText);
        expect(result.replace(/\s+/g, ' ').trim()).toEqual(expectedOutput.replace(/\s+/g, ' ').trim());
    });

    it('should handle input with fewer lines and characters than the specified limits', () => {
        const inputText = "Short line 1.\nShort line 2.";
        const expectedOutput = "Short line 1.\nShort line 2.";
        const result = truncateValue(inputText);
        expect(result.replace(/\s+/g, ' ').trim()).toEqual(expectedOutput.replace(/\s+/g, ' ').trim());
    });

    it('should handle empty input', () => {
        const inputText = '';
        const expectedOutput = '';
        const result = truncateValue(inputText);
        expect(result).toBe(expectedOutput);
    });
});

describe('Test checkLanguage', () => {
    it('should return "English" when all items have language_id "en"', () => {
        const data = [{ language_id: 'en' }, { language_id: 'en' }, { language_id: 'en' }];
        const result = checkLanguage(data);
        expect(result).toBe('English');
    });

    it('should return "Spanish" when all items have language_id "es"', () => {
        const data = [{ language_id: 'es' }, { language_id: 'es' }, { language_id: 'es' }];
        const result = checkLanguage(data);
        expect(result).toBe('Spanish');
    });

    it('should return "Unknown Language" when all items have an unknown language_id', () => {
        const data = [{ language_id: 'it' }];
        const result = checkLanguage(data);
        expect(result).toBe('Unknown Language');
    });

    it('should return "English/Spanish" when items have both "en" and "es" language_ids', () => {
        const data = [{ language_id: 'en' }, { language_id: 'es' }, { language_id: 'en' }];
        const result = checkLanguage(data);
        expect(result).toBe('English/Spanish');
    });

    it('should return "Multiple Languages" when items have more than two unique language_ids', () => {
        const data = [{ language_id: 'en' }, { language_id: 'es' }, { language_id: 'fr' }];
        const result = checkLanguage(data);
        expect(result).toBe('Multiple Languages');
    });

    it('should handle empty input', () => {
        const data = [{}];
        const result = checkLanguage(data);
        expect(result).toBe('Unknown Language');
    });
});

describe('Test unixTimestampToDateTime', () => {
    it('should format the current date as "Today at h:mm A"', () => {
        const unixTimestamp = moment().unix();
        const result = unixTimestampToDateTime(unixTimestamp);
        expect(result).toMatch(/^Today at \d{1,2}:\d{2} [APap][Mm]$/);
    });

    it('should format the previous date as "Yesterday at h:mm A"', () => {
        const unixTimestamp = moment().subtract(1, 'days').unix();
        const result = unixTimestampToDateTime(unixTimestamp);
        expect(result).toMatch(/^Yesterday at \d{1,2}:\d{2} [APap][Mm]$/);
    });

    it('should format the date within the same week as "DayOfWeek at h:mm A"', () => {
        const unixTimestamp = moment().subtract(2, 'days').unix();
        const result = unixTimestampToDateTime(unixTimestamp);
        const dayOfWeek = moment.unix(unixTimestamp).format('dddd');
        expect(result).toMatch(new RegExp(`^${dayOfWeek} at \\d{1,2}:\\d{2} [APap][Mm]$`));
    });

    it('should format any other date as "MMM D, YYYY at h:mm A"', () => {
        const unixTimestamp = moment().subtract(8, 'days').unix();
        const result = unixTimestampToDateTime(unixTimestamp);
        expect(result).toMatch(/^([A-Z][a-z]{2} \d{1,2}, \d{4} at \d{1,2}:\d{2} [APap][Mm])$/);
    });
});