import {Text} from 'react-native';
import React from 'react';
import Statitics from "../app/Components/Statistics";
import { shallow } from 'enzyme';

describe(Statitics,()=>{
    it('distance shown corectly',()=>{
        const wrapper = shallow(<Statitics distance="40"/>);
        expect(wrapper.find(Text).at(0).prop('children')).toContain("40");
    })
    it('time shown corectly',()=>{
        const wrapper = shallow(<Statitics duration="10" />);
        expect(wrapper.find(Text).at(1).prop('children')).toContain("10");
    })
})
