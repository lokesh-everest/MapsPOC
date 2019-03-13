import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import MapsContainerDelivery from '../app/Components/DelieveryPerson/MapsContainerDelivery';

describe(MapsContainerDelivery,()=>{
    it('render correcly',()=>{
        const wrapper = shallow(<MapsContainerDelivery />);
        expect(wrapper).toMatchSnapshot();
    })
})
