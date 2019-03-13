import 'react-native';
import React from 'react';
import HomeScreen from "../app/Components/HomeScreen";
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

describe(HomeScreen,()=>{
    it('user clicked correctly',()=>{
        const mockFN =  jest.fn();
        const wrapper = shallow(<HomeScreen navigation={{navigate:mockFN}}/>);
        wrapper.find('TouchableOpacity[id="user"]').props().onPress();
        expect(mockFN).toHaveBeenCalledTimes(1);
    })
    it('driver clicked correctly',()=>{
        const mockFN =  jest.fn();
        const wrapper = shallow(<HomeScreen navigation={{navigate:mockFN}}/>);
        wrapper.find('TouchableOpacity[id="delivery"]').props().onPress();
        expect(mockFN).toHaveBeenCalledTimes(1);
    })
})
