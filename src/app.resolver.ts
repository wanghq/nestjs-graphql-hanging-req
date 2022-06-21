import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'creator' })
export class Creator {
  @Field((type) => ID)
  id: string;
}

@ObjectType({ description: 'country' })
export class Country {
  @Field((type) => ID)
  id: string;
}

@ObjectType({ description: 'recipe' })
export class Recipe {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Creator, { nullable: true })
  creator?: Creator;

  @Field((type) => Creator, { nullable: true })
  creator2?: Creator;

  @Field((type) => Country, { nullable: true })
  country?: Country;

  @Field((type) => Country, { nullable: true })
  country2?: Country;
}

@Resolver((of) => Recipe)
export class AppResolver {
  constructor(
    @Inject('CONNECTION')
    private readonly connection,
  ) {}

  @Query(() => Boolean)
  public test(): boolean {
    return true;
  }

  @ResolveField()
  public creator(@Parent() recipe): Creator {
    console.log('in creator');
    const { id } = recipe;
    const creator: Creator = {
      id: '1',
    };
    return creator;
  }

  @ResolveField()
  public creator2(@Parent() recipe): Creator {
    console.log('in creator');
    const { id } = recipe;
    const creator: Creator = {
      id: '2',
    };
    return creator;
  }
}

@Resolver((of) => Recipe)
export class App3Resolver {
  @ResolveField()
  public country(@Parent() recipe): Country {
    console.log('in country');
    throw new Error('country 2 failed');
  }

  @ResolveField()
  public country2(@Parent() recipe): Country {
    console.log('in country2');
    throw new Error('country 2 failed');
  }
}

@Resolver('App2')
export class App2Resolver {
  @Query(() => Boolean)
  public test2(): boolean {
    // // Correctly calls the CustomExceptionFilter
    // throw new CustomException();

    return true;
  }

  @Query((returns) => Recipe)
  public recipe(@Args('id') id: string): Recipe {
    console.log('in recipe');
    const recipe: Recipe = {
      id: '1',
    };
    return recipe;
  }
}
