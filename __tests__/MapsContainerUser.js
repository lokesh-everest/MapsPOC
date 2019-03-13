import 'react-native';
import React from 'react';
import MapsContainerUser from "../app/Components/User/MapsContainerUser";
import { shallow} from 'enzyme';

describe(MapsContainerUser,()=>{
    it('render correcly',()=>{
        const wrapper = shallow(<MapsContainerUser />);
        expect(wrapper).toMatchSnapshot();
    })
})
