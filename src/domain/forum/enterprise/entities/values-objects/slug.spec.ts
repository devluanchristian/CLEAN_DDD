import { Slug } from './slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('O grande Homem')

  expect(slug.value).toBe('o-grande-homem')
})
