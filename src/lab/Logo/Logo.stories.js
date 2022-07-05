import React from 'react';
import Logo from './Logo';

export default {
  title: 'Example/Logo',
  component: Logo,
};

const Template = (args) => <Logo {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const Xlarge = Template.bind({});
Xlarge.args = {
  size: 'xlarge',
};
