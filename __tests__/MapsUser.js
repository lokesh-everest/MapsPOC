import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import MapsUser from "../app/Components/User/MapsUser";
import { shallow} from 'enzyme';

describe(MapsUser, () => {
    it('render correcly', () => {
        const wrapper = shallow(<MapsUser markers={[{ 'latitude': 0, 'longitude': 0 }]} />);
        expect(wrapper).toMatchSnapshot();
    })
})
