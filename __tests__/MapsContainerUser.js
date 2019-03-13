import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import MapsContainerUser from "../app/Components/User/MapsContainerUser";

import renderer from 'react-test-renderer';
import { shallow,mount,configure } from 'enzyme';

describe(MapsContainerUser,()=>{
    it('render correcly',()=>{
        const wrapper = shallow(<MapsContainerUser />);
        expect(wrapper).toMatchSnapshot();
    })
})
