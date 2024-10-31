#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct No
{
    const char *nome;
    int eh_diretorio;
    struct No *pai;
};

No *criar_no(const char *nome, int eh_diretorio, No *pai)
{
    No *no = (No *)malloc(sizeof(struct No));
    // ... resto do código ...
}

void exibir_prompt(No *atual)
{
    if (atual->pai == NULL)
    {
        printf("->");
        return;
    }

    // Primeiro, contar quantos níveis temos até a raiz
    No *temp = atual;
    int profundidade = 0;
    while (temp->pai != NULL)
    {
        profundidade++;
        temp = temp->pai;
    }

    // Criar array para armazenar os nomes
    char caminhos[20][MAX_CMD_LEN];

    // Preencher array com os nomes
    temp = atual;
    int i = profundidade - 1;
    while (temp->pai != NULL)
    {
        strcpy(caminhos[i], temp->info_arquivo.nome);
        temp = temp->pai;
        i--;
    }

    // Imprimir o caminho
    printf("-");
    for (int j = 0; j < profundidade; j++)
    {
        printf("%s-", caminhos[j]);
    }
    printf(">");
}