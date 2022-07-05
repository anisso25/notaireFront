import React from 'react';
import PageLoading from './PageLoading';

export default {
  title: 'Example/PageLoading',
  component: PageLoading,
};

const Template = (args) => <PageLoading {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 30,
  color: '#3F5486',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 70,
  color: '#3F5486',
};

export const Large = Template.bind({});
Large.args = {
  size: 100,
  color: '#3F5486',
};

export const Xlarge = Template.bind({});
Xlarge.args = {
  size: 120,
  color: '#3F5486',
};
