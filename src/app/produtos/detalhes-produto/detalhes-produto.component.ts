import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/carrinho.service';
import { NotificationService } from 'src/app/notification.service';
import { IProduto } from 'src/app/produtos';
import { ProdutosService } from 'src/app/produtos.service';
import { IProdutoCarrinho } from 'src/app/produtos';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit{
  produto: IProduto | undefined;
  quantidade = 1;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;     
    const produtoId = Number(routeParams.get("id"));
    this.produto = this.produtosService.getOne(produtoId);
  }

  adicionarAoCarrinho() {
    this.notificationService.notificar("O produto foi adicionado ao carrinho :D");
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quantidade
    }
    this.carrinhoService.adicionarAoCarrinho(produto);
  }
}
