import 'react-native';
import React from 'react';
import HomeScreen from "../app/Components/HomeScreen";

import renderer from 'react-test-renderer';

it('render correcly',()=>{
    const tree = renderer.create(<HomeScreen />);
    expect(tree).toMatchSnapshot();
})
