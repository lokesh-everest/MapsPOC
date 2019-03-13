import 'react-native';
import React from 'react';
import Statitics from "../app/Components/Statistics";

import renderer from 'react-test-renderer';

it('render correcly',()=>{
    const tree = renderer.create(<Statitics />);
    expect(tree).toMatchSnapshot();
})
