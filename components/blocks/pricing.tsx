import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksPricing, PageBlocksPricingPlans } from '../../tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';

export const Pricing = ({ data }: { data: PageBlocksPricing }) => {
   return (
      <Section background={data.background!}>
         <div className="text-center">
            <h2 className="text-title text-3xl font-semibold" data-tina-field={tinaField(data, 'title')}>
               {data.title}
            </h2>
            <p className="text-body mt-6" data-tina-field={tinaField(data, 'description')}>
               {data.description}
            </p>
         </div>

         <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.plans?.map((plan, index) => (
               <PricingCard key={index} plan={plan!} featured={plan?.featured || false} />
            ))}
         </div>
      </Section>
   );
};

const PricingCard = ({ plan, featured }: { plan: PageBlocksPricingPlans; featured?: boolean }) => {
   return (
      <Card className={`relative ${featured ? 'border-primary shadow-lg scale-105' : ''}`}>
         {featured && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
               <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
               </span>
            </div>
         )}

         <CardHeader>
            <CardTitle data-tina-field={tinaField(plan, 'name')}>
               {plan.name}
            </CardTitle>
            <CardDescription data-tina-field={tinaField(plan, 'description')}>
               {plan.description}
            </CardDescription>
            <div className="mt-4">
               <span className="text-4xl font-bold" data-tina-field={tinaField(plan, 'price')}>
                  {plan.price}
               </span>
               {plan.period && (
                  <span className="text-muted-foreground" data-tina-field={tinaField(plan, 'period')}>
                     /{plan.period}
                  </span>
               )}
            </div>
         </CardHeader>

         <CardContent>
            <ul className="space-y-3">
               {plan.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                     {feature?.included ? (
                        <Check className="size-4 text-green-500 flex-shrink-0" />
                     ) : (
                        <X className="size-4 text-red-500 flex-shrink-0" />
                     )}
                     <span data-tina-field={tinaField(feature, 'text')}>
                        {feature?.text}
                     </span>
                  </li>
               ))}
            </ul>
         </CardContent>

         <CardFooter>
            <Button
               asChild
               className="w-full"
               variant={featured ? 'default' : 'outline'}
               data-tina-field={tinaField(plan, 'buttonText')}
            >
               <Link href={plan.buttonLink || '#'}>
                  {plan.buttonText || 'Get Started'}
               </Link>
            </Button>
         </CardFooter>
      </Card>
   );
};

export const pricingBlockSchema: Template = {
   name: 'pricing',
   label: 'Pricing',
   ui: {
      previewSrc: '/blocks/pricing.png',
      defaultItem: {
         title: 'Simple, transparent pricing',
         description: 'Choose the plan that works best for your needs',
         plans: [
            {
               name: 'Basic',
               description: 'Perfect for individuals',
               price: '$9',
               period: 'month',
               featured: false,
               buttonText: 'Get Started',
               buttonLink: '#',
               features: [
                  { text: 'Up to 5 projects', included: true },
                  { text: 'Basic support', included: true },
                  { text: '1GB storage', included: true },
                  { text: 'Advanced analytics', included: false },
               ],
            },
            {
               name: 'Pro',
               description: 'Best for growing teams',
               price: '$29',
               period: 'month',
               featured: true,
               buttonText: 'Get Started',
               buttonLink: '#',
               features: [
                  { text: 'Up to 25 projects', included: true },
                  { text: 'Priority support', included: true },
                  { text: '10GB storage', included: true },
                  { text: 'Advanced analytics', included: true },
               ],
            },
            {
               name: 'Enterprise',
               description: 'For large organizations',
               price: '$99',
               period: 'month',
               featured: false,
               buttonText: 'Contact Sales',
               buttonLink: '#',
               features: [
                  { text: 'Unlimited projects', included: true },
                  { text: '24/7 support', included: true },
                  { text: 'Unlimited storage', included: true },
                  { text: 'Custom integrations', included: true },
               ],
            },
         ],
      },
   },
   fields: [
      sectionBlockSchemaField as any,
      {
         type: 'string',
         label: 'Title',
         name: 'title',
      },
      {
         type: 'string',
         label: 'Description',
         name: 'description',
         ui: {
            component: 'textarea',
         },
      },
      {
         type: 'object',
         list: true,
         label: 'Pricing Plans',
         name: 'plans',
         ui: {
            defaultItem: {
               name: 'Basic Plan',
               description: 'Perfect for individuals',
               price: '$9',
               period: 'month',
               featured: false,
               buttonText: 'Get Started',
               buttonLink: '#',
            },
            itemProps: (item) => {
               return {
                  label: item.name,
               };
            },
         },
         fields: [
            {
               type: 'string',
               label: 'Plan Name',
               name: 'name',
            },
            {
               type: 'string',
               label: 'Description',
               name: 'description',
            },
            {
               type: 'string',
               label: 'Price',
               name: 'price',
            },
            {
               type: 'string',
               label: 'Period',
               name: 'period',
               options: [
                  { label: 'Month', value: 'month' },
                  { label: 'Year', value: 'year' },
                  { label: 'One-time', value: 'one-time' },
               ],
            },
            {
               type: 'boolean',
               label: 'Featured Plan',
               name: 'featured',
            },
            {
               type: 'string',
               label: 'Button Text',
               name: 'buttonText',
            },
            {
               type: 'string',
               label: 'Button Link',
               name: 'buttonLink',
            },
            {
               type: 'object',
               list: true,
               label: 'Features',
               name: 'features',
               ui: {
                  defaultItem: {
                     text: 'Feature description',
                     included: true,
                  },
                  itemProps: (item) => {
                     return {
                        label: item.text,
                     };
                  },
               },
               fields: [
                  {
                     type: 'string',
                     label: 'Feature Text',
                     name: 'text',
                  },
                  {
                     type: 'boolean',
                     label: 'Included',
                     name: 'included',
                  },
               ],
            },
         ],
      },
   ],
};