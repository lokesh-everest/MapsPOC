import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import { shallow} from 'enzyme';
import MapsDelivery from '../app/Components/DelieveryPerson/MapsDelivery';

describe(MapsDelivery,()=>{
    it('render correcly',()=>{
        const wrapper = shallow(<MapsDelivery markers={[]}/>);
        expect(wrapper).toMatchSnapshot();
    })
})
